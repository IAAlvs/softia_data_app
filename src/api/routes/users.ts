import express from "express";
// Controlador para obtener todos los usuarios
import { getUsers, getUser, getUserFiles } from "../controllers/userController";
const userRouter: express.Router = express.Router();
// Ruta para obtener todos los usuarios
userRouter.get(`/api/v1/user`, getUsers);
userRouter.get(`/api/v1/user/:userId`,getUser)
userRouter.get(`/api/v1/user-files/:userId`,getUserFiles) 

//export default router;
export default userRouter;
