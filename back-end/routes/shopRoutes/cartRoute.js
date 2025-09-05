import express from 'express';
import { addCart, deleteCartItem, fetchCartItem, updateCartQuantity } from '../../controllers/shop/cartController.js';


const router = express.Router();
router.post('/add', addCart);
router.get('/get/:userId', fetchCartItem);
router.put('/update-cart', updateCartQuantity);
router.delete('/delete/:userId/:productId', deleteCartItem);

export default router;