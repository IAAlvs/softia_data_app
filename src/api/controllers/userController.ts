// src/users/usersController.ts
import { provideSingleton } from '../aspects/provideSingleton';
import {inject, injectable } from "inversify";
import { UserServiceInterface } from '../interfaces/UserServiceInterface';
import TYPES from '../interfaces/ServiceTypes';
import {
  Controller,
  Get,
  Path,
  Route,
  SuccessResponse,
  Response,
  Security,
  Body,
  Post} from "tsoa";
import { ValidatorInterface } from '../interfaces/ValidatorInterface';
import { ValidationError } from '../interfaces/ValidationError';
export interface UserControllerInterface{
    getUser(userId: UUID, validator?: any): Promise<GetUserResponseDto | ErrorResponse>,
    getUsers(): Promise<GetUserResponseDto[] | ErrorResponse>
}

/** 
 *@isString Provide valid string
 @pattern ^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$ Field does not match UUID pattern
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
export interface GetUserFilesDtoResponse{
  userId : UUID,
  files : Array<UUID>
} 
export interface ErrorResponse {
message: string;
statusCode: number;
}
export interface UploadUserFile{
  userId : UUID,
  fileId : UUID
}
export interface PostUserFileRequestDto{
  userId : UUID, 
  fileId : UUID,
    /** 
  *@isInt parameter fileType is string
  *@minimum 1 fileSize can be less than 1
  *@maximum 99999999 max value is 9999999999
  */
  fileSize : number,
  /** 
  *@isString parameter fileType is string
  *@minLength 1 Can not be empty
  *@maxLength 10 Max num of characters is 10
  */
  fileType : string,
    /** 
  *@isString parameter fileType is string
  *@minLength 3 fileType can not be empty
  *@maxLength 10 fileType max character number are 10
  *@pattern ^\d{4}-\d{2}-\d{2}$ Field does not match date YYYY-MM-DD pattern
  */
  dropDate : string,
  visible? : boolean
}
export interface PostUserFileResponseDto{
  userId : UUID, 
  fileId : UUID,
  fileSize : number,
  fileType : string,
  dropDate : string,
  visible : boolean,
  createdAt : Date,
  updatedAt : Date
}
@Route("api/v1/")
@provideSingleton(UsersController)
@injectable()
export class UsersController extends Controller implements UserControllerInterface {
  //private readonly UserServiceInterface _user
  constructor(
    @inject(TYPES.UserServiceInterface) private _userService: UserServiceInterface
    ) {
    super();
  }

  @Security("auth0",["read:users"])
  @Get("users/{userId}")
  @Response(401, 'UnAuthorized')
  @Response<ErrorResponse>(400, "Bad request")
  @Response<ErrorResponse>(404, "Not found")
  @Response(500, "Server Error")
  public async getUser(@Path() userId: UUID): Promise<GetUserResponseDto | ErrorResponse>{
    try {
      //this._validatorUser.validateData(userId);
      const user = await this._userService.getUser(userId);
      if (!user){
        const errorResponse: ErrorResponse = {
          message: 'User not found',
          statusCode: 404
        };
        this.setStatus(404);
        return errorResponse;
      }   
      this.setStatus(200);
      return user;
      
    }
    catch (error) {
      if(error instanceof ValidationError)
      {
        const validationErrorResponse: ErrorResponse = {
          message: error.message || "not matched pattern for id",
          statusCode: 400
        };
        this.setStatus(400);
        return validationErrorResponse;
        
      }
      const errorResponse: ErrorResponse = {
        message: 'Internal server error',
        statusCode: 500
      };
      this.setStatus(500);
      return errorResponse;
    }
  }
  //@Security("jwt", ["admin"])
  @Get("users")
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
  @Security("auth0",["read:users"])
  @Get("user-files/{userId}")
  @Response(401, 'UnAuthorized')
  @Response<ErrorResponse>(400, "Bad request")
  @Response<ErrorResponse>(404, "Not found")
  @Response(500, "Server Error")
  public async getUserFiles(@Path() userId: UUID): Promise<GetUserFilesDtoResponse | ErrorResponse>{
    try {
      const userFiles = await this._userService.getUserFiles(userId);
      if (!userFiles){
        const errorResponse: ErrorResponse = {
          message: 'User not found',
          statusCode: 404
        };
        this.setStatus(404);
        return errorResponse;
      }   
      this.setStatus(200);
      return userFiles;
      
    }
    catch (error) {
      console.log({error})

      if(error instanceof ValidationError)
      {
        const validationErrorResponse: ErrorResponse = {
          message: error.message || "not matched pattern for id",
          statusCode: 400
        };
        this.setStatus(400);
        return validationErrorResponse;
        
      }
      const errorResponse: ErrorResponse = {
        message: 'Internal server error',
        statusCode: 500
      };
      this.setStatus(500);
      return errorResponse;
    }
  }
  @Security("auth0",["upload:user-files"])
  @Post("user-files")
  @Response(401, 'UnAuthorized')
  @Response<ErrorResponse>(400, "Bad request")
  @Response(500, "Server Error")
  public async uploadUserFile(@Body() request : PostUserFileRequestDto): Promise<PostUserFileResponseDto | ErrorResponse>{    
    try {
      const userFile = await this._userService.uploadUserFile(request); 
      this.setStatus(200);
      //We  have multiple dtos one for service an other for service
      return userFile;
    }
    catch (error) {
      if(error instanceof ReferenceError)
      {
        const conflictResponse: ErrorResponse = {
          message: error.message || "Conflict",
          statusCode: 409
        };
        this.setStatus(409);
        return conflictResponse;
      }
      const errorResponse: ErrorResponse = {
        message: 'Internal server error',
        statusCode: 500
      };
      this.setStatus(500);
      return errorResponse;
    }
  }
}
