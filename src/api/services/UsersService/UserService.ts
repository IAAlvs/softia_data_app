import { injectable } from 'inversify';
import { UserServiceInterface } from '../../interfaces/UserServiceInterface';
import {User} from  "../../models/user";
import { UserFiles } from '../../models/user-file';
import { GetUserFilesDtoResponse, GetUserResponseDto, PostUserFileRequestDto, PostUserFileResponseDto} from "../../dtos/UserDtos";

@injectable()
export class UserService implements UserServiceInterface {
  public async getUser(userId : string): Promise<GetUserResponseDto | null> {
    const user: User | null = await User.findByPk(userId)
      if (!user) {
        return null;
    }
/*     id : user.id, authId : user.authId, email : user.data, 
    name : user.name, lastName : user.lastName, 
    secondLastName : user.secondLastName, age : user.age, 
    address : user.address */
    const response: GetUserResponseDto = {...user.dataValues};
    return response;
  }
  public async getUsers(): Promise<GetUserResponseDto[]> {
    const users: User[] | null = await User.findAll();
      if(users == null){
        return[];
      }
      /* id: user.id, authId: user.authId, email: user.email,
          name: user.name, lastName: user.lastName,
          secondLastName: user.secondLastName, age: user.age,
          address: user.address */
      const response: GetUserResponseDto[] = users.map((user: User): GetUserResponseDto => ({
      ...user.dataValues    
      })
      ); 
      return response;   
  }
  public async getUserFiles(userId : string): Promise<GetUserFilesDtoResponse | null> {
    const user: User | null = await User.findByPk(userId);
      if (!user) {
        return null;
    }
    //Only retrieves fileIds
    const userFiles : UserFiles[] | undefined = await UserFiles.findAll({ 
      attributes : ["fileId"],
      where : {
      userId : user.dataValues.id,
      visible : true
    }});
    if(userFiles === undefined || userFiles === null){
      return ({
        userId: user.dataValues.id,
        files : []
      });}
    const files = userFiles.map(e => e.dataValues.fileId)
    const response: GetUserFilesDtoResponse = {
      userId: user.dataValues.id,
      files : files
    }
    return response;

    //console.log(userFiles.dataValues)



  }
  public async uploadUserFile(postDto : PostUserFileRequestDto): Promise<PostUserFileResponseDto> {
    const user: User | null = await User.findByPk(postDto.userId);
      if (!user) {
        throw new ReferenceError("User not found");
    }
    const fileExist = await UserFiles.findAndCountAll({
      where : {
        userId : postDto.userId,
        fileId : postDto.fileId
      }
    })
    if(fileExist.count>0){
      throw new ReferenceError(`File with id ${postDto.fileId} already exists`)
    }
    //Only retrieves fileIds
    const userFile : UserFiles = await UserFiles.create({
      userId : postDto.userId ,
      fileId : postDto.fileId, 
      fileSize : postDto.fileSize,
      fileType : postDto.fileType,
      dropDate : postDto.dropDate,
      visible : postDto.visible || true
    })
    return userFile.dataValues;

  }

  
  
}