import express from "express";
import userRouter from "./routes/users"
import dotenv from "dotenv";
//import {cors} form "cors";
import swaggerSetup from "./swagger.config";
import {databaseSetup} from "../database/database.config";
import morgan from "morgan";
const json = express.json;
dotenv.config();
const environment:string = process.env.NODE_ENV || 'development';
const expressPort = process.env.EXPRESS_SERVER_PORT || 4000;

//running
console.log(`Running in ${environment} environment`)
//Database config
databaseSetup();
//Running app 
const app  = express();
//app.use(cors());
// Swagger setup
if (environment === 'development') {
  // Configuración de Swagger solo para entorno de desarrollo
  swaggerSetup(app);
}
// Middlewares
app.use(json());
app.use(morgan("tiny"));
app.use(express.static("public"));
// Api routes
app.use('', userRouter);

// Server running
app.listen(expressPort, () => {
  console.log(`Server starting at : http://localhost:${expressPort}`);
});
