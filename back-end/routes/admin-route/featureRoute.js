import express from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/auth/admin/featureController.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

export default router;