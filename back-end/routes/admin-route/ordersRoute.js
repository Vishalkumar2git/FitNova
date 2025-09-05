import express from "express";
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/auth/admin/ordersController.js";


const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

export default router;