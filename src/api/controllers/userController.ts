import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Response as TsoaResponse
} from "tsoa";
import { User } from '../models/user';
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
interface GetUserResponseDto{
    id: UUID,
    authId : string,
    email : string,
    name? : string,
    lastName? : string,
    secondLastName? : string,
    age? : number,
    address? : string
}
  
interface ErrorResponse {
message: string;
statusCode: number;
}

@Route("api/v1/users")
export class userController extends Controller{
  @SuccessResponse("200", "Ok") 
  @TsoaResponse(404)
  @TsoaResponse(500)
  /**
   * @example userId "52907745-7672-470e-a803-a2f8feb52944"
   * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   */
  @Get("{userId}")
  public async getUser(@Path() userId: string): Promise<GetUserResponseDto | ErrorResponse>{
    try {
      const user: User | null = await User.findByPk(userId)
      if (user) {
        const response: GetUserResponseDto = {
          id : user.id, authId : user.authId, email : user.email, 
          name : user.name, lastName : user.lastName, 
          secondLastName : user.secondLastName, age : user.age, 
          address : user.address
        };
        //res.json(response);
        this.setStatus(200);
        return response;
      } else {
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
  @TsoaResponse(500)
  public async getUsers(): Promise<GetUserResponseDto[] | ErrorResponse> {
    try {
      const users: User[] | null = await User.findAll();
      if(users == null){
        //res.json([]);
        this.setStatus(200);
        return[];
      }
      const response: GetUserResponseDto[] = users.map(function(user:User):GetUserResponseDto{
          return {
            id : user.id, authId : user.authId, email : user.email, 
          name : user.name, lastName : user.lastName, 
          secondLastName : user.secondLastName, age : user.age, 
          address : user.address
  
          }
        }
      ); 
      //res.json(response);
      this.setStatus(200);
      return response;
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
/* 
  public async getUserFiles(req: Request, res: Response): Promise<void>  {
    // Lógica para obtener los usuarios de la base de datos
    // y enviar la respuesta al cliente
    const users: User[] = [];
    res.json(users);
  }
*/






