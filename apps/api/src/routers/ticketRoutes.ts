import express from 'express';
import { buyTicket } from '../controllers/ticketController';
// import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/buy',buyTicket); // Protected route

export default router;
