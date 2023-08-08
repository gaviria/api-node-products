import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import morgan from "morgan";
import { createRoles } from "./libs/initialSetup";

const app: Application = express();
createRoles();//Create Roles in database
app.use(morgan('dev')); //log for request
app.use(express.json());
app.set("port", 4000);

//routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

export default app; 