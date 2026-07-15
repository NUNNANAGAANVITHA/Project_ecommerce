import express from 'express';
import { getFiltersMetadata, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/filters', getFiltersMetadata);
router.get('/', getProducts);

export default router;
