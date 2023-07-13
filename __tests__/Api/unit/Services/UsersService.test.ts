import request from "supertest";
import app from "../../../../src/api/server";
import { sequelize } from "../../../../src/database/database.config";
import { User } from "../../../../src/api/models/user";
import { UserFiles } from "../../../../src/api/models/user-file";
import { UserServiceInterface } from "@/api/interfaces/UserServiceInterface";
import { iocContainer } from "../../../../src/api/aspects/inversify.config";
import TYPES from "../../../../src/api/interfaces/ServiceTypes";
import { GetUserFilesDtoResponse, GetUserResponseDto, PostUserFileRequestDto } from "../../../../src/api/dtos/UserDtos";

let _userService : UserServiceInterface;
const datesAreEqualWithinRange = (date1: Date, date2 : Date) => {
  const differenceInSeconds = Math.abs(date1.getTime() - date2.getTime()) / 1000;
  return differenceInSeconds <= 100;
};
describe('User Service Tests', () => {
  beforeAll(async () =>{
    //Change environment to tests
    _userService= iocContainer.get<UserServiceInterface>(TYPES.UserServiceInterface);
    await sequelize.sync({ force: true });
  },5000)
  
  beforeEach(async () =>{
    const userToAdd = {
      id : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      email : "emailtests@gmail.com",
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Doe2',
      age : 50, 
      address : "Address example"
    }
    const userToAdd2 = {
      id : '61ad624c-7233-4839-8ece-49fe0e3041be',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041le',
      email : "email2tests@gmail.com",
      name: 'Jue',
      lastName: 'Roe',
      secondLastName: 'Poe',
      age : 22, 
      address : "Address example"
    }
    
    /* '61ad624c-7233-4839-8ece-49fe0e3041be' */
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-07-06",
      visible : true, 
      createdAt : new Date(),
      updatedAt : new Date()
    }
    await User.create(userToAdd);
    await User.create(userToAdd2);
    await UserFiles.create(fileToAdd);
  });
  afterEach(async() =>{
    await UserFiles.destroy({where: {userId : '61ad624c-7233-4839-8ece-49fe0e3041ce'}});
    await UserFiles.destroy({where: {fileId : '62ad624c-7233-4839-8ece-49fe0e3042ce'}})
    await User.destroy({where: {id : '61ad624c-7233-4839-8ece-49fe0e3041ce'}});
    await User.destroy({where: {id : '61ad624c-7233-4839-8ece-49fe0e3041be'}});
  });
  test("WithExistenceUserId_GetUser_User", async () =>{
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ce';
    const expectedUser : GetUserResponseDto = {
      id : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      email : "emailtests@gmail.com",
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Doe2',
      age : 50, 
      address : "Address example",
      createdAt : new Date(),
      updatedAt : new Date()
    };

    const response = await _userService.getUser(userId)!;
    if(!response)
      throw new Error("Null response");

    expect(response.id).toEqual(expectedUser.id);
    expect(response.authId).toEqual(expectedUser.authId);
    expect(response.email).toEqual(expectedUser.email);
    expect(response.name).toEqual(expectedUser.name);
    expect(response.lastName).toEqual(expectedUser.lastName);
    expect(response.secondLastName).toEqual(expectedUser.secondLastName);
    expect(response.address).toEqual(expectedUser.address);
    expect(datesAreEqualWithinRange(response.createdAt, expectedUser.createdAt)).toBe(true);
    expect(datesAreEqualWithinRange(response.updatedAt, expectedUser.updatedAt)).toBe(true);
  })
  test("WithInexistenceUserId_GetUser_Null", async () =>{
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ca';

    const response = await _userService.getUser(userId)!;

    expect(response).toBeNull();
    
  })
  test("ExecuteGetUsers_GetUsers_GetUsersArray", async () =>{
    const numOfExpectedUsers = 2;
    const expectedUsers :GetUserResponseDto [] = [{
      id : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      email : "emailtests@gmail.com",
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Doe2',
      age : 50, 
      address : "Address example",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : '61ad624c-7233-4839-8ece-49fe0e3041be',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041le',
      email : "email2tests@gmail.com",
      name: 'Jue',
      lastName: 'Roe',
      secondLastName: 'Poe',
      age : 22, 
      address : "Address example",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ]

    const respose = await _userService.getUsers()!;
    if(!respose)
      throw new Error("Null response");
    const users = respose;
    expect(respose).toHaveLength(numOfExpectedUsers);
    respose.forEach((userRetrieved, i) =>{
      expect(userRetrieved.id).toEqual(expectedUsers[i].id);
      expect(userRetrieved.authId).toEqual(expectedUsers[i].authId);
      expect(userRetrieved.email).toEqual(expectedUsers[i].email);
      expect(userRetrieved.name).toEqual(expectedUsers[i].name);
      expect(userRetrieved.lastName).toEqual(expectedUsers[i].lastName);
      expect(userRetrieved.secondLastName).toEqual(expectedUsers[i].secondLastName);
      expect(userRetrieved.address).toEqual(expectedUsers[i].address);
      expect(datesAreEqualWithinRange(userRetrieved.createdAt, expectedUsers[i].createdAt)).toBe(true);
      expect(datesAreEqualWithinRange(userRetrieved.updatedAt, expectedUsers[i].updatedAt)).toBe(true);
    })

  })
  describe('Delete Users In db to get Empty', () => {
    beforeEach(async() =>{
      await UserFiles.destroy({where: {userId : '61ad624c-7233-4839-8ece-49fe0e3041ce'}})
      await User.destroy({where: {id : '61ad624c-7233-4839-8ece-49fe0e3041ce'}});
      await User.destroy({where: {id : '61ad624c-7233-4839-8ece-49fe0e3041be'}});
    });
    test("GetUsers_GetUsersFromEmptyDb_GetEmptyArray", async () =>{
      const numOfExpectedUsers = 0;
  
      const respose = await _userService.getUsers()!;
      if(!respose)
        throw new Error("Null response");
  
      expect(respose).toHaveLength(numOfExpectedUsers);
    })
  });

  test("WithExistenceUserId_GetUserFiles_ExistenceFile", async () =>{
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ce';
    const expectedUserFile : GetUserFilesDtoResponse = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      files : [
        {
          id: "62ad624c-7233-4839-8ece-49fe0e3041ce",
          fileSize: 10101, 
          fileType: "pdf",
          dropDate: "2023-07-06",
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date(), 
        }
      ]
    }
    const response = await _userService.getUserFiles(userId)!;
    if(!response)
      throw new Error("Null response");
    const fileRetrieved = response.files[0];

    expect(response.userId).toEqual(expectedUserFile.userId);
    expect(response.files).toHaveLength(1);
    expect(fileRetrieved.id).toStrictEqual(expectedUserFile.files[0].id);
    expect(fileRetrieved.fileSize).toStrictEqual(expectedUserFile.files[0].fileSize);
    expect(fileRetrieved.fileType).toStrictEqual(expectedUserFile.files[0].fileType);
    expect(fileRetrieved.visible).toStrictEqual(expectedUserFile.files[0].visible);
    expect(fileRetrieved.dropDate).toEqual(expectedUserFile.files[0].dropDate);
    expect(datesAreEqualWithinRange(fileRetrieved.createdAt, expectedUserFile.files[0].createdAt)).toBe(true);
    expect(datesAreEqualWithinRange(fileRetrieved.createdAt, expectedUserFile.files[0].createdAt)).toBe(true);
  })
  test("WithInexistenceUserId_GetUserFiles_Null", async () =>{
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041da';
    
    const response = await _userService.getUserFiles(userId)!;

    expect(response).toBeNull();
  })
  test("WithInexistenceFilesForUser_GetUserFiles_ReturnsEmptyArray", async () =>{
    const userId = "61ad624c-7233-4839-8ece-49fe0e3041be";
    
    const response = await _userService.getUserFiles(userId)!;
    if(!response)
      throw new Error("Null response");

    expect(response.userId).toBe("61ad624c-7233-4839-8ece-49fe0e3041be");
    expect(response.files).toHaveLength(0);
  })
  /* Test UploadUserFiles */
  test("WithValidObject_UploadUserFile_FileAdded", async () =>{
    const uploadFileObj : PostUserFileRequestDto = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3042ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-07-06",
      visible : true
    }
    const response = await _userService.uploadUserFile(uploadFileObj);

    expect(response.userId).toEqual(uploadFileObj.userId);
    expect(response.fileId).toEqual(uploadFileObj.fileId);
    expect(response.fileSize).toEqual(uploadFileObj.fileSize);
    expect(response.fileType).toEqual(uploadFileObj.fileType);
    expect(response.dropDate).toEqual(uploadFileObj.dropDate);
    expect(response.visible).toEqual(uploadFileObj.visible);
    expect(datesAreEqualWithinRange(response.createdAt, new Date())).toBe(true);
    expect(datesAreEqualWithinRange(response.updatedAt, new Date())).toBe(true);
  });
  test("WithInexistenceFilesForUser_GetUserFiles_ReturnsEmptyArray", async () =>{
    const userId = "61ad624c-7233-4839-8ece-49fe0e3041be";
    
    const response = await _userService.getUserFiles(userId)!;
    if(!response)
      throw new Error("Null response");

    expect(response.userId).toBe("61ad624c-7233-4839-8ece-49fe0e3041be");
    expect(response.files).toHaveLength(0);
  })
  /* Test UploadUserFiles */
  test("WithInexistenceUser_UploadUserFile_Error", async () =>{
    const uploadFileObj : PostUserFileRequestDto = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041rm',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3042ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-07-06",
      visible : true
    }
    const addFileCallback = async () => await _userService.uploadUserFile(uploadFileObj);

    await expect(addFileCallback).rejects.toThrow(ReferenceError)
  });
  test("WithExistenceFileIdAndUserId_UploadUserFile_Error", async () =>{
    const uploadFileObj : PostUserFileRequestDto = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-07-06",
      visible : true
    }
    const addFileCallback = async () => await _userService.uploadUserFile(uploadFileObj);

    await expect(addFileCallback).rejects.toThrow(ReferenceError)
  });


});
