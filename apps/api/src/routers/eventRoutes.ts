import express from 'express';
import { getAllEvents, getEventDetails } from '../controllers/eventController';
import { createEvent } from '../controllers/createEvent';
import { createPromotion } from '../controllers/createPromotion';
import { getAllEventsBrowse } from '../controllers/GetAll';
// import { authenticateToken } from '../middlewares/authMiddleware';
import prisma from '../utils/prisma';

const router = express.Router();

router.get('/all', getAllEvents); // Route untuk mendapatkan semua event (Public)  AMAN
// router.get('/:id', getEventDetails); // Route untuk mendapatkan detail event berdasarkan ID (Public) AMAN
router.post('/create', createEvent); // Route untuk mendapatkan detail event berdasarkan ID (Public) AMAN
router.post('/promo', createPromotion); // Route untuk mendapatkan detail event berdasarkan ID (Public) AMAN
router.get('/browse', getAllEventsBrowse)

router.get("/:slug", async (req, res) => {
    const { slug } = req.params;

    console.log(slug)
    
    try {
      const event = await prisma.events.findUnique({
        where: { slug },
        include: { eventCategory: true },
      });
      if (!event)  res.status(404).json({ message: "Event not found" });
      
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Endpoint untuk mendapatkan detail event berdasarkan ID
router.get('/api/event/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.events.findUnique({
      where: { id: Number(id) }, // Gunakan Prisma untuk query berdasarkan ID
    });

    if (!event) {
       res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event details' });
  }
});
  
export default router;