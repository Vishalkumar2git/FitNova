import express from 'express';
import {
    handleImageUpload,
    addProduct,
    fetchProduct,
    editProduct,
    deleteProduct

} from '../../controllers/auth/admin/product.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();
router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add', addProduct);
router.get('/fetch', fetchProduct);
router.put('/update/:id', editProduct);
router.delete('/delete/:id', deleteProduct);


export default router;