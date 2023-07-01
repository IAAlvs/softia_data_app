import { UserServiceInterface } from "./UserServiceInterface";
import { ErrorResponse, GetUserResponseDto, UserControllerInterface } from "../controllers/userController";
import { randomUUID } from "crypto";
import { UUID } from "crypto";
const usi : UserServiceInterface = {
    async getUser(userId : UUID)  : Promise<null> {
        return new Promise(() => null);;
    },
    async getUsers()  : Promise<[]> {
        return new Promise(() => []);
    }
} 
const uci : UserControllerInterface ={
    getUser: function (userId: string): Promise<GetUserResponseDto | ErrorResponse> {
        throw new Error("Function not implemented.");
    },
    getUsers: function (): Promise<ErrorResponse | GetUserResponseDto[]> {
        throw new Error("Function not implemented.");
    }
}
//We add examples to avoid renaming of hardcoded string types
const TYPES = {
    UserServiceInterface : Symbol('UserServiceInterface'),
    UserControllerInterface : Symbol('UserControllerInterface')

};
  export default TYPES;
  