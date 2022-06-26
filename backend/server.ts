import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import paypalRoutes from "./routes/paypalRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import morgan from "morgan";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

connectDB();

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/config/paypal", paypalRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
  })
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});