import express, {urlencoded, Response, Request} from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
const json = express.json;
dotenv.config();
const environment:string = process.env.NODE_ENV || 'development';


export default function AddMiddlewares(app : express.Application){
    app.use(urlencoded({extended: true}));
    app.use(json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));
    if (environment === 'development') {
        // Swagger only for development
        app.use(
          "/api/v1/users-api",
          swaggerUi.serve,
          swaggerUi.setup(undefined, {
            swaggerOptions: {
              url: "/swagger.json",
            },
          })
        );
    }



}