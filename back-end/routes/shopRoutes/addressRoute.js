import express from 'express';
import { addAddress, deleteAddress, editAddress, fetchAddress } from '../../controllers/shop/addressController.js';

const router = express.Router();
router.post("/add", addAddress);
router.get("/get/:userId", fetchAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router;
