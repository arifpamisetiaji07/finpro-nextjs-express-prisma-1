import { PrismaClient, SaleType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Hapus semua data terlebih dahulu
    await prisma.tickets.deleteMany();
    await prisma.transactions.deleteMany();
    await prisma.events.deleteMany();
    await prisma.cities.deleteMany();
    await prisma.regions.deleteMany();
    await prisma.countries.deleteMany();
    await prisma.event_category.deleteMany();
    await prisma.event_type.deleteMany();
    await prisma.users.deleteMany();
    await prisma.roles.deleteMany();
    await prisma.promotions.deleteMany();
    await prisma.vouchers.deleteMany();
    await prisma.payment_method.deleteMany();
    await prisma.points.deleteMany();

    console.log('Semua data berhasil dihapus.');

    // Create dummy roles
    await prisma.roles.createMany({
        data: [
            { name: 'Admin' },
            { name: 'User' },
        ],
    });

    console.log('Data Roles berhasil ditambahkan.');

    // Create dummy countries
    const createdCountries = await prisma.countries.createMany({
        data: [
            { name: 'United States' },
            { name: 'Indonesia' },
        ],
    });
    console.log('Data Countries berhasil ditambahkan.');

    // Ambil ID negara dari database
    const countries = await prisma.countries.findMany();
    const usId = countries.find((country) => country.name === 'United States')?.id;
    const indonesiaId = countries.find((country) => country.name === 'Indonesia')?.id;

    if (!usId || !indonesiaId) {
        throw new Error('Failed to retrieve country IDs.');
    }

    // Create dummy regions
    await prisma.regions.createMany({
        data: [
            { country_id: usId, region_name: 'California' },
            { country_id: usId, region_name: 'New York' },
            { country_id: indonesiaId, region_name: 'Jakarta' },
            { country_id: indonesiaId, region_name: 'Bali' },
        ],
    });
    console.log('Data Regions berhasil ditambahkan.');

    // Ambil ID region dari database
    const regions = await prisma.regions.findMany();
    const californiaId = regions.find((region) => region.region_name === 'California')?.id;
    const newYorkId = regions.find((region) => region.region_name === 'New York')?.id;
    const jakartaId = regions.find((region) => region.region_name === 'Jakarta')?.id;
    const baliId = regions.find((region) => region.region_name === 'Bali')?.id;

    if (!californiaId || !newYorkId || !jakartaId || !baliId) {
        throw new Error('Failed to retrieve region IDs.');
    }

    // Create dummy cities
    const createdCities = await prisma.cities.createMany({
        data: [
            { region_id: californiaId, city_name: 'Los Angeles' },
            { region_id: newYorkId, city_name: 'New York City' },
            { region_id: jakartaId, city_name: 'Jakarta' },
            { region_id: baliId, city_name: 'Denpasar' },
        ],
    });
    console.log('Data Cities berhasil ditambahkan.');

    // Ambil ID roles secara dinamis
    const roles = await prisma.roles.findMany();
    const adminRoleId = roles.find((role) => role.name === 'Admin')?.id;
    const userRoleId = roles.find((role) => role.name === 'User')?.id;

    if (!adminRoleId || !userRoleId) {
        throw new Error('Failed to retrieve role IDs.');
    }

    // Create dummy users
    await prisma.users.createMany({
        data: Array.from({ length: 10 }, (_, i) => ({
            fullname: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            phone_number: `12345678${i + 1}`,
            password: `password${i + 1}`,
            referral_code: `REF${i + 1}`,
            total_point: 1000,
            role_id: i === 0 ? adminRoleId : userRoleId, // User pertama sebagai Admin, lainnya sebagai User
        })),
    });
    console.log('Data Users berhasil ditambahkan.');

    // Create dummy event types
    await prisma.event_type.createMany({
        data: [
            { name: 'Workshop' },
            { name: 'Conference' },
        ],
    });
    console.log('Data Event Types berhasil ditambahkan.');

    // Create dummy event categories
    await prisma.event_category.createMany({
        data: [
            { name: 'Technology' },
            { name: 'Art' },
        ],
    });
    console.log('Data Event Categories berhasil ditambahkan.');

    // Ambil ID event_type
    const eventTypes = await prisma.event_type.findMany();
    const workshopId = eventTypes.find((type) => type.name === 'Workshop')?.id;
    const conferenceId = eventTypes.find((type) => type.name === 'Conference')?.id;

    if (!workshopId || !conferenceId) {
        throw new Error('Failed to retrieve event type IDs.');
    }

    // Ambil ID event_category
    const eventCategories = await prisma.event_category.findMany();
    const technologyId = eventCategories.find((category) => category.name === 'Technology')?.id;
    const artId = eventCategories.find((category) => category.name === 'Art')?.id;

    if (!technologyId || !artId) {
        throw new Error('Failed to retrieve event category IDs.');
    }

    // Ambil ID city
    const cities = await prisma.cities.findMany();
    const losAngelesCityId = cities.find((city) => city.city_name === 'Los Angeles')?.id;
    const newYorkCityId = cities.find((city) => city.city_name === 'New York City')?.id;
    const baliCityId = cities.find((city) => city.city_name === 'Denpasar')?.id;
    const jakartaCityId = cities.find((city) => city.city_name === 'Jakarta')?.id;

    if (!losAngelesCityId || !newYorkCityId || !baliCityId || !jakartaCityId) {
        throw new Error('Failed to retrieve city IDs.');
    }

    // Create dummy events
    await prisma.events.createMany({
        data: Array.from({ length: 10 }, (_, i) => ({
            name: `Event ${i + 1}`,
            slug: `event-${i + 1}`,
            start_date: new Date(),
            end_date: new Date(),
            price: 100 + i * 10,
            discount_price: 80 + i * 10,
            city_id: i % 2 === 0 ? losAngelesCityId : newYorkCityId, // Gunakan ID city yang valid
            location: `Location ${i + 1}`,
            description: `Description for Event ${i + 1}`,
            seats: 100,
            event_type_id: i % 2 === 0 ? workshopId : conferenceId, // Gunakan ID event_type
            event_category_id: i % 2 === 0 ? technologyId : artId, // Gunakan ID event_category
            created_by: 1, // Pastikan created_by valid
            sale_type: i % 2 === 0 ? SaleType.paid : SaleType.free,
        })),
    });
    console.log('Data Events berhasil ditambahkan.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
