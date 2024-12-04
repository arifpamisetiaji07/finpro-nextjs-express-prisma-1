import express, { Request, Response, Application } from 'express';
import { PORT as port, BASE_WEB_URL } from "./config";
import cors from "cors";
import reviewRoutes from './routes/reviewRoutes';
import eventRoutes from './routes/eventRoutes';
import ticketRoutes from './routes/ticketRoutes'

const PORT = Number(port) || 8000;

const app: Application = express();

app.use(
    cors({
        origin: BASE_WEB_URL || "http://localhost:3000",
        credentials: true,
    })
);
// app.use(cors());
app.use(express.json());

app.use("/api/event", eventRoutes); //route event
app.use("/api/ticket", ticketRoutes); //route event
// Routes
app.use('/api/reviews', reviewRoutes);



app.listen(PORT, () => {
    console.log(`Server jalan di ${PORT}`)
})


export default app;