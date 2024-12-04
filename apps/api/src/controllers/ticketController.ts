import { Request, Response } from 'express';
import  prisma  from '../utils/prisma';
import { User } from '../custom';
import { BuyTicketRequest } from '../types';

// Membeli tiket
export const buyTicket = async (req: Request, res: Response) => {
  const { userId, eventId, qty } = req.body  as BuyTicketRequest;

  try {
    // Transaksi database untuk memastikan konsistensi
    const result = await prisma.$transaction(async (prisma) => {
      const event = await prisma.events.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        throw new Error('Event not found');
      }

      if (event.seats !== null && event.seats < qty) {
        throw new Error('Insufficient seats available');
      }

      // Buat transaksi
      const transaction = await prisma.transactions.create({
        data: {
          code: `TRX-${Date.now()}`,
          user_id: userId,
          event_id: eventId,
          qty,
          tax: 0, // Sesuaikan jika ada perhitungan pajak
          total_amount: event.price ?parseFloat(event.price.toString()) * qty : 0,
          status: 'Pending',
          payment_method_id: 1, // Sementara hardcoded
        },
      });

      // Update jumlah seats jika tersedia
      if (event.seats !== null) {
        await prisma.events.update({
          where: { id: eventId },
          data: { seats: event.seats - qty },
        });
      }

      return transaction;
    });

    res.status(201).json({ message: 'Ticket purchased successfully', transaction: result });
  } catch (error) {
    res.status(400).json({ message: 'Failed to purchase ticket', error: "Gagal Transaksi" });
  }
};
