import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createEvent = async (req: Request, res: Response) => {
  const {
    name,
    slug,
    start_date,
    end_date,
    price,
    discount_price,
    city_id,
    location,
    description,
    seats,
    event_type_id,
    event_category_id,
    sale_type, // free or paid
    created_by,
  } = req.body;

  try {
    const event = await prisma.events.create({
      data: {
        name,
        slug,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: sale_type === 'paid' ? price : null, // Hanya set harga jika berbayar
        discount_price: discount_price || null,
        city_id,
        location,
        description,
        seats: seats || null,
        event_type_id,
        event_category_id,
        created_by,
        sale_type,
      },
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error: "Gagal Transaksi" });
  }
};
