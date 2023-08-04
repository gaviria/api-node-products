import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import morgan from "morgan";

const app: Application = express();
app.use(morgan('dev')); //log for request
app.use(express.json());
app.set("port", 4000);

//routes
app.use(authRoutes);
app.use('/products', productsRoutes);

export default app; 