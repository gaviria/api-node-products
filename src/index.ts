import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./database";

app.listen(app.get("port"));
console.log('Server Listen on port: ', app.get("port"));