import express from "express";
import dotenv from "dotenv";
import authenticate from "./configuration/database.js";
import cors from "cors";
import route from "./routes/route.js";
import cookieParser from "cookie-parser";
import productRouter from './routes/admin-route/product-route.js';
import productRoute from './routes/shopRoutes/productRoute.js';
import cartRoute from './routes/shopRoutes/cartRoute.js';
import addressRoute from './routes/shopRoutes/addressRoute.js';
import orderRoute from './routes/shopRoutes/orderRoute.js';
import ordersRoute from './routes/admin-route/ordersRoute.js';
import searchRoute from './routes/shopRoutes/searchRoute.js';
import reviewRoute from './routes/shopRoutes/reviewRoute.js';
import featureRoute from './routes/admin-route/featureRoute.js';
const app = express()
dotenv.config();
const PORT = process.env.PORT 

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
  authenticate();
app.use(express.json());
app.use(cookieParser());
app.use('/api/path', route);
app.use('/api/admin/product', productRouter);
app.use('/api/admin/orders', ordersRoute);
app.use('/api/admin/feature', featureRoute);


app.use('/api/shop/product', productRoute);
app.use('/api/shop/cart', cartRoute);
app.use('/api/shop/address', addressRoute);
app.use('/api/shop/order', orderRoute);
app.use("/api/shop/search", searchRoute);
app.use("/api/shop/review", reviewRoute);



app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`)
});
