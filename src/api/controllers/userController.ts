// src/users/usersController.ts
import { provideSingleton } from '../inversify/provideSingleton';
import {inject, injectable } from "inversify";
import { UserServiceInterface } from '../interfaces/UserServiceInterface';
import TYPES from '../interfaces/ServiceTypes';
import {
  Controller,
  Get,
  Path,
  Route,
  SuccessResponse,
  Response
} from "tsoa";
export interface UserControllerInterface{
    getUser(userId: UUID): Promise<GetUserResponseDto | ErrorResponse>,
    getUsers(): Promise<GetUserResponseDto[] | ErrorResponse>
}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
export interface GetUserResponseDto{
    id: UUID,
    authId : string,
    email : string,
    name? : string,
    lastName? : string,
    secondLastName? : string,
    age? : number,
    address? : string
}
  
export interface ErrorResponse {
message: string;
statusCode: number;
}

@Route("api/v1/users")
//@provideSingleton<UserServiceInterface>(TYPES.UserServiceInterface)
@provideSingleton(UsersController)
//@provideSingleton(FooController)
@injectable()
export class UsersController extends Controller implements UserControllerInterface {
  //private readonly UserServiceInterface _user
  constructor(
    @inject(TYPES.UserServiceInterface) private _userService: UserServiceInterface) {
    super();
  }
  @Get("{userId}")
  @Response<ErrorResponse>(404, "not found")
  @Response(500, "Server Error")
  public async getUser(@Path() userId: UUID): Promise<GetUserResponseDto | ErrorResponse>{
    try {
      const user = await this._userService.getUser(userId);
      if (user) 
        return user;
      else{
        const errorResponse: ErrorResponse = {
          message: 'User not found',
          statusCode: 404
        };
        //res.status(404).json(errorResponse);
        this.setStatus(404);
        return errorResponse;
      }
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: 'Internal server error',
        statusCode: 500
      };
      this.setStatus(500);
      //res.status(500).json(errorResponse);
      return errorResponse;
    }
  }
  @Get()
  @SuccessResponse("200", "Ok")
  @Response(500, "Server Error")
  public async getUsers(): Promise<GetUserResponseDto[] | ErrorResponse> {
    try {
      const users = await this._userService.getUsers();
      this.setStatus(200);
      return users;
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: 'Internal server error',
        statusCode: 500
      };
      //res.status(500).json(errorResponse);
      this.setStatus(500);
      return errorResponse;
    }
  }
  
}
