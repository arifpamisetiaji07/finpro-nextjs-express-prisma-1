import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createPromotion = async (req: Request, res: Response) => {
  const {
    event_id,
    name,
    type, // jenis promosi (contoh: diskon persentase atau diskon nominal)
    image,
    is_banner,
    start_date,
    end_date,
    created_by,
    amount, // jumlah diskon
    voucher_code,
    qty, // jumlah voucher yang tersedia
  } = req.body;

  try {
    const promotion = await prisma.promotions.create({
      data: {
        event_id,
        name,
        type,
        image,
        is_banner,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        created_by,
        vouchers: {
          create: {
            voucher_code,
            qty,
            type,
            category: 'event_discount', // contoh kategori
            amount,
            status: true, // voucher aktif
            start_date: new Date(start_date),
            end_date: new Date(end_date),
          },
        },
      },
    });

    res.status(201).json({ message: 'Promotion created successfully', promotion });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create promotion', error: "Gagal Transaksi" });
  }
};
