import { Request, Response } from 'express';
import { User } from '../models/user';
import { UUID } from 'crypto';

interface GetUserResponseDto {
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

const  getUser = async (req: Request, res: Response<GetUserResponseDto | ErrorResponse>): Promise<void> => {
  const userId = req.params.userId;
  try {
    const user: User | null = await User.findByPk(userId)
    if (user) {
      const response: GetUserResponseDto = {
        id : user.id, authId : user.authId, email : user.email, 
        name : user.name, lastName : user.lastName, 
        secondLastName : user.secondLastName, age : user.age, 
        address : user.address
      };
      res.json(response);
    } else {
      const errorResponse: ErrorResponse = {
        message: 'User not found',
        statusCode: 404
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: 'Internal server error',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};
const getUsers = async (req: Request, res: Response<GetUserResponseDto[] | ErrorResponse>): Promise<void> => {
  try {
    const users: User[] | null = await User.findAll();
    if(users == null){
      res.json([]);
      return;
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
    res.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: 'Internal server error',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};
const getUserFiles = (req: Request, res: Response): void => {
  // Lógica para obtener los usuarios de la base de datos
  // y enviar la respuesta al cliente
  const users: User[] = [];
  res.json(users);
};

export {getUsers, getUser, getUserFiles};
