import express from 'express';


import {filteredProducts, productDetails} from '../../controllers/shop/productController.js';

const router = express.Router();

router.get('/get', filteredProducts);
router.get('/get/:id', productDetails)


export default router;