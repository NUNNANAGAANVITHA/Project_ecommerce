import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/products', productRoutes);
app.use(errorHandler);

export default app;
