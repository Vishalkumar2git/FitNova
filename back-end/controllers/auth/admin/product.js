import { imageUploadServer } from "../../../helpers/cloudinary.js";
import Product from "../../../models/ProductModel.js";

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadServer(url);
        res.json({
            success: true,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Image upload failed',
            error: error.message
        });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const createNewProduct = new Product({
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            image,
        });
        await createNewProduct.save();
        res.status(201).json({
            success: true,
            data: createNewProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
};

// Fetch all products
const fetchProduct = async (req, res) => {
    try {
        const listProduct = await Product.find({});
        res.status(200).json({
            success: true,
            data: listProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
};

// Edit product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, brand, price, salePrice, totalStock, image } = req.body;
        const updateProduct = await Product.findById(id);
        if (!updateProduct) return res.status(404).json({
            success: false,
            message: 'Product not found',
        });

        updateProduct.title = title || updateProduct.title;
        updateProduct.description = description || updateProduct.description;
        updateProduct.category = category || updateProduct.category;
        updateProduct.brand = brand || updateProduct.brand;
        updateProduct.price = price || updateProduct.price;
        updateProduct.salePrice = salePrice || updateProduct.salePrice;
        updateProduct.totalStock = totalStock || updateProduct.totalStock;
        updateProduct.image = image || updateProduct.image;

        await updateProduct.save();

        res.status(200).json({
            success: true,
            data: updateProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({
            success: false,
            message: 'Product not found'
        });

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
};

export { handleImageUpload, addProduct, fetchProduct, editProduct, deleteProduct };
