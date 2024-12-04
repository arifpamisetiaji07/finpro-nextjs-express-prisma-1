import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Mendapatkan semua event
export const getAllEvents = async (req: Request, res: Response) => {
  const { page = 1, size = 10, search = '', category, location } = req.query;
  const pageSize = parseInt(size as string);
  const skip = (parseInt(page as string) - 1) * pageSize;

  try {
    const events = await prisma.events.findMany({
      where: {
        name: { contains: search as string },
        eventCategory: category ? { name: category as string } : undefined,
        cities: location ? { city_name: location as string } : undefined,
      },
      skip,
      take: pageSize,
      include: { eventCategory: true, cities: true },
      orderBy: { start_date: 'asc' },
    });

    const totalEvents = await prisma.events.count({
      where: {
        name: { contains: search as string },
        eventCategory: category ? { name: category as string } : undefined,
        cities: location ? { city_name: location as string } : undefined,
      },
    });

    res.json({ events, total: totalEvents, page: parseInt(page as string), size: pageSize });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve events', error });
  }
};

// Mendapatkan detail event
export const getEventDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await prisma.events.findUnique({
      where: { id: parseInt(id) },
      include: { eventCategory: true, cities: true, rating: true },
    });

    if (!event) {
       res.status(404).json({ message: 'Event not found' });
       return;
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve event details', error });
  }
};
