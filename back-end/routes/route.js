import express from "express";
import {register, loginUser, logout, authMiddleware} from "../controllers/auth/pathController.js";

const router = express.Router();
router.post('/register', register);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated user',
        user,
    });
});





export default router;