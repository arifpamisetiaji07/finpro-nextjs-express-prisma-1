import { Request, Response } from 'express';
import prisma from '../utils/prisma';


export const getAllEventsBrowse = async (req: Request, res: Response) => {
    const { page = 1, size = 10, search = '', category, date, saleType } = req.query;
    const pageSize = parseInt(size as string);
    const skip = (parseInt(page as string) - 1) * pageSize;
  
    let dateFilter = {};
    if (date === "today") {
      dateFilter = { start_date: { gte: new Date(), lte: new Date() } };
    } else if (date === "this_weekend") {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() + (6 - startDate.getDay())); // Sabtu
      endDate.setDate(endDate.getDate() + (7 - endDate.getDay())); // Minggu
      dateFilter = { start_date: { gte: startDate, lte: endDate } };
    }
  
    try {
      const events = await prisma.events.findMany({
        where: {
          name: { contains: search as string },
          eventCategory: category ? { name: category as string } : undefined,
          ...dateFilter,
          sale_type: saleType ? (saleType === "free" ? "free" : "paid") : undefined,
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
          ...dateFilter,
          sale_type: saleType ? (saleType === "free" ? "free" : "paid") : undefined,
        },
      });
  
      res.json({ events, total: totalEvents, page: parseInt(page as string), size: pageSize });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve events', error });
    }
  };
  