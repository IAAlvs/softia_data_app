import request from "supertest";
import app from "../../../src/api/server";
import { sequelize } from "../../../src/database/database.config";
import { User } from "../../../src/api/models/user";
import { UserFiles } from "../../../src/api/models/user-file";
import {getTestToken, configureEnvv} from "../utils/generateTestPayload";
import { KeyValuePair } from "tailwindcss/types/config";
const authDependency =  require("../../../src/api/middlewares/Authorization/AuthorizationMiddleware");
import { JsonWebTokenError } from "jsonwebtoken";


// Mock the 'database.js' module that imports Sequelize
//change environment to test
let token:string; 
let configureEnv:KeyValuePair<string, object>;
process.env.TEST_ENV = "test";
describe('Integration Tests', () => {
  beforeAll(async () =>{
    configureEnvv();
    //token= configureEnv.token as unknown as string;
    await sequelize.sync({ force: true });
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
    await UserFiles.create(fileToAdd);

  },5000)
  beforeEach(()=>{
    authDependency.expressAuthentication = jest.fn().mockImplementation((request, securityScope, scopes?)=>
    {
      //We will send token docoded cause of test purpose
      const token = request.headers['authorization'];

        return new Promise((resolve, reject) =>{
          if(!token)
            reject(new JsonWebTokenError("Not token found"))
          const decoded = JSON.parse(token?.split(" ")[1]);
            if (decoded.aud != process.env.AUTH0_AUDIENCE_USERS) {
              reject(new JsonWebTokenError('UnAuthorized 1'));
            }
            if (decoded.iss != `https://${process.env.AUTH0_DOMAIN}/`) {
              reject(new JsonWebTokenError("UnAuthorized 2"));
            }
            if(scopes && scopes!.length !== 0)
            {
              for (let scope of scopes!) {
                if (!decoded.scope || !decoded.scope.includes(scope)) {
                  reject(new JsonWebTokenError("Unauthorized 3"));
                }
              }
            }
            resolve(decoded);
        })
    })
  })
  /* ENDPOINT GET USER BY ID */
  test('WithPermissionAndValidUserId_GetUser_SuccessUser', async () => {
    const scopes = ["read:users"]
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ce'
    const token = JSON.stringify(getTestToken(scopes));
    const expectedUser = {
      id : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      authId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      email : "emailtests@gmail.com",
      name: 'John',
      lastName: 'Doe',
      secondLastName: 'Doe2',
      age : 50, 
      address : "Address example"
    };


    const response = await request(app).get(`/api/v1/users/${userId}`).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    //First check dates that had happend same date no exactly time
    expect(new Date(bodyResponse.createdAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);
    expect(new Date(bodyResponse.updatedAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);
    delete bodyResponse.createdAt;  // or delete person["age"];
    delete bodyResponse.updatedAt;
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(bodyResponse).toEqual(expectedUser)
  });

  test('WithOutRequiredScopes_GetUser_UnAuthorized', async () => {
    const scopes = ["read:user-files"]
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ce'
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/users/${userId}`).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });
  test('WithRequiredScopesNotFoundUserId_GetUser_404', async () => {
    const scopes = ["read:users"]
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ca'
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/users/${userId}`).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(404);
  });
  test('WithRequiredScopesInvalidIdPatter_GetUser_422', async () => {
    const scopes = ["read:users"];
    const userId = 'invalidaidstrucutre';
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/users/${userId}`).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(422);
  });

  test('WithOutAuthorization_GetUser_UnAuthorized', async () => {
    const userId = '61ad624c-7233-4839-8ece-49fe0e3041ce'

    const response = await request(app).get(`/api/v1/users/${userId}`);
    
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });

  /* ENDPOINT GET USERS */
  test('WithPermission_GetUsers_SuccessUsers', async () => {
    const scopes = ["all:users"]
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get('/api/v1/users').
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(bodyResponse.length).toBe(1);
    expect(bodyResponse[0].id).toBe('61ad624c-7233-4839-8ece-49fe0e3041ce');
  });
  test('WithOutRequiredScopes_GetUsers_UnAuthorized', async () => {
    const scopes = ["upload:user-files"]
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get('/api/v1/users').
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });

  test('WithOutAuthorization_GetUsers_UnAuthorized', async () => {
    const response = await request(app).get('/api/v1/users');

    const bodyResponse = response["_body"]
    
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });

  /* ENDPOINT GET USER FILES */
  test('WithPermissionAndValidUserId_GetUserFiles_SuccessUserFile', async () => {
    const scopes = ["read:users"];
    const USERID = "61ad624c-7233-4839-8ece-49fe0e3041ce";
    const token = JSON.stringify(getTestToken(scopes));
    //We will test properties 1 by one 
    const expectedUserFile =   {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-07-06",
      visible : true, 
      createdAt : "fakedate",
      updatedAt : "fakedate"
    }

    const response = await request(app).get(`/api/v1/user-files/${USERID}`).
    set('Authorization', `Bearer ${token}`);

    const bodyResponse = response["_body"]
    const {userId, files} = bodyResponse;
    const {id, fileSize, fileType, dropDate, visible, createdAt, updatedAt} = files[0];
    const fileId = id;
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(userId).toStrictEqual(expectedUserFile.userId);
    expect(fileId).toStrictEqual(expectedUserFile.fileId);
    expect(fileSize).toStrictEqual(expectedUserFile.fileSize);
    expect(fileType).toStrictEqual(expectedUserFile.fileType);
    expect(visible).toStrictEqual(expectedUserFile.visible);
    expect(dropDate).toEqual(expectedUserFile.dropDate);
    //Date of no more thant  5 secods ago
    expect(new Date(createdAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);
    expect(new Date(updatedAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);
  });
  test('WithOutToken_GetUserFiles_Unauthorized', async () => {
    const USERID = "61ad624c-7233-4839-8ece-49fe0e3041ce";

    const response = await request(app).get(`/api/v1/user-files/${USERID}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });
  test('WithOutRequiredScopes_GetUserFiles_Unauthorized', async () => {
    const scopes : Array<string> = [];
    const USERID = "61ad624c-7233-4839-8ece-49fe0e3041ce";
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/user-files/${USERID}`).
    set('Authorization', `Bearer ${token}`);

    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });
  test('WithRequiredScopesButNotExistenceUserId_GetUserFiles_404', async () => {
    const scopes = ["read:users"];
    const USERID = "61ad624c-7233-4839-8ece-49fe0e3041da";
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/user-files/${USERID}`).
    set('Authorization', `Bearer ${token}`);

    const bodyResponse = response["_body"]
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(404);
  });
  test('WithRequiredScopesInvalidIdPatter_GetUser_422', async () => {
    const scopes = ["read:users"];
    const userId = 'invalidaidstrucutre';
    const token = JSON.stringify(getTestToken(scopes));

    const response = await request(app).get(`/api/v1/user-files/${userId}`).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(422);
  }); 
  /*  POST USER FILE DTO */
  const dtoTests = [
    //wrong userId pattern
    //we will use a flag to identify number of wron property
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b0",
      "fileSize": 99999999,
      "fileType": "string",
      "dropDate": "2030-08-22",
      "visible": true
    },
    //wrong fileId pattern 
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de6",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b",
      "fileSize": 99999999,
      "fileType": "string",
      "dropDate": "2030-08-22",
      "visible": true
    },
    //wrong fileSize data
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de6",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b0",
      "fileSize": -2,
      "fileType": "string",
      "dropDate": "2030-08-22",
      "visible": true
    },
    //wrong fileType
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de6",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b0",
      "fileSize": 1000,
      "fileType": "",
      "dropDate": "2030-08-22",
      "visible": true
    },
    //wrong dropDate
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de6",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b0",
      "fileSize": 1000,
      "fileType": "pdf",
      "dropDate": "2030-08-33",
      "visible": true
    },
    //Wrong visible dataType
    {
      "userId": "6d01953a-794d-5bcd-996d-7bab0d1f2de6",
      "fileId": "be2854fb-9366-5f75-8720-ff8c74e840b0",
      "fileSize": 1000,
      "fileType": "pdf",
      "dropDate": "2030-08-22",
      "visible": "hallo"
    }
  ];
  /*
  Example wrong value
      {
      message: 'Validation Failed',
      details: {
        'request.dropDate': {
          message: 'Field does not match date YYYY-MM-DD pattern',
          value: '2030-14-22'
        }
      }
     
  */
  /* Invalid properties */
  let indexProperty =0;
  test.each(dtoTests)(`Wrong property 422`, async dto => {
    const scopes = ["upload:user-files"]
    const token = JSON.stringify(getTestToken(scopes));
    const dtoKeys = Object.keys(dto);
    const dtoValues = Object.values(dto)
    const keyTofail  = dtoKeys[indexProperty];

    const response = await request(app).post(`/api/v1/user-files`).send(dto).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"];

    expect(bodyResponse["message"]).toEqual('Validation Failed');
    //Just and error because is only a property Wrong

    expect(Object.keys(bodyResponse["details"]).length).toEqual(1);
    expect(bodyResponse["details"][`request.${keyTofail}`]["message"]).toBeTruthy();
    expect(bodyResponse["details"][`request.${keyTofail}`]["message"]).toBeTruthy();
    expect(bodyResponse["details"][`request.${keyTofail}`]["value"]).toBe(dtoValues[indexProperty])
    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(422);
    indexProperty++;

  });
  test('WithPermissionAndCorrectValues_UploadUserFile_SuccessResponse', async () => {
    const scopes = ["upload:user-files"]
    const token = JSON.stringify(getTestToken(scopes)); 
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ba',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-10-06"
    };

    const response = await request(app).post(`/api/v1/user-files/`).send(fileToAdd).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(bodyResponse.userId).toBe('61ad624c-7233-4839-8ece-49fe0e3041ce');
    expect(bodyResponse.fileId).toBe('62ad624c-7233-4839-8ece-49fe0e3041ba');
    expect(bodyResponse.fileSize).toBe(10101)
    expect(bodyResponse.fileType).toBe("pdf");
    expect(bodyResponse.dropDate).toBe("2023-10-06");
    expect(bodyResponse.visible).toBe(true);
    expect(new Date(bodyResponse.createdAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);
    expect(new Date(bodyResponse.updatedAt).toISOString().split("T")[0]).toEqual(new Date().toISOString().split("T")[0]);  
  });
  test('WithPermissionCorrectValuesButInexistenceUser_UploadUserFile_Conflict', async () => {
    const scopes = ["upload:user-files"]
    const token = JSON.stringify(getTestToken(scopes)); 
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ca',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ba',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-10-06"
    };

    const response = await request(app).post(`/api/v1/user-files/`).send(fileToAdd).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(409);
    expect(bodyResponse.message).toBe('User not found');
  });
  test('WithPermissionCorrectValuesButFileAlreadyExist_UploadUserFile_Conflict', async () => {
    const scopes = ["upload:user-files"]
    const token = JSON.stringify(getTestToken(scopes)); 
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-10-06"
    };

    const response = await request(app).post(`/api/v1/user-files/`).send(fileToAdd).
    set('Authorization', `Bearer ${token}`);
    const bodyResponse = response["_body"]

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(bodyResponse.message).toEqual(`File with id ${fileToAdd.fileId} already exists`)
    expect(response.status).toBe(409);
  });
  test('WithOutToken_UploadUserFile_UnAuthorized', async () => {
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-10-06"
    };

    const response = await request(app).post(`/api/v1/user-files/`).send(fileToAdd);

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });
  test('WithTokenButNotPermissions_UploadUserFile_UnAuthorized', async () => {
    const scopes = ["read:users"]
    const token = JSON.stringify(getTestToken(scopes)); 
    const fileToAdd = {
      userId : '61ad624c-7233-4839-8ece-49fe0e3041ce',
      fileId : '62ad624c-7233-4839-8ece-49fe0e3041ce',
      fileSize : 10101,
      fileType : "pdf",
      dropDate : "2023-10-06"
    };

    const response = await request(app).post(`/api/v1/user-files/`).send(fileToAdd).
    set('Authorization', `Bearer ${token}`);

    expect(authDependency.expressAuthentication).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
  });
});
