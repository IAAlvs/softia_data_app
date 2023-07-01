import { injectable } from 'inversify';
import { UserServiceInterface } from '../../interfaces/UserServiceInterface';
import {User} from  "../../models/user";
//import { UUID } from "crypto";
import { GetUserResponseDto } from "../../dtos/UserDtos";

@injectable()
export class UserService implements UserServiceInterface {
  public async getUser(userId : string): Promise<GetUserResponseDto | null> {
    const user: User | null = await User.findByPk(userId)
      if (!user) {
        return null;
    }
    const response: GetUserResponseDto = {
        id : user.id, authId : user.authId, email : user.email, 
        name : user.name, lastName : user.lastName, 
        secondLastName : user.secondLastName, age : user.age, 
        address : user.address
      };
    return response;
  }
  public async getUsers(): Promise<GetUserResponseDto[]> {
    const users: User[] | null = await User.findAll();
      if(users == null){
        return[];
      }
      const response: GetUserResponseDto[] = users.map((user: User): GetUserResponseDto => ({
          id: user.id, authId: user.authId, email: user.email,
          name: user.name, lastName: user.lastName,
          secondLastName: user.secondLastName, age: user.age,
          address: user.address
      })
      ); 
      return response;   
  }
}