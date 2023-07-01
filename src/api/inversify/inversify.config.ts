import { buildProviderModule } from "inversify-binding-decorators";
import { Container, decorate, injectable } from "inversify";
import { Controller } from "tsoa";
import { UserService } from '../services/UsersService/UserService';
import { UserServiceInterface } from "../interfaces/UserServiceInterface";
import { UserControllerInterface, UsersController } from "../controllers/userController";
import TYPES from "../interfaces/ServiceTypes";



const iocContainer = new Container();

decorate(injectable(), Controller);
iocContainer.bind<UserServiceInterface>(TYPES.UserServiceInterface).to(UserService).inSingletonScope()
iocContainer.bind<UserControllerInterface>(TYPES.UserControllerInterface).to(UsersController).inSingletonScope();
//iocContainer.bind<UsersController>(UsersController);
//iocContainer.bind<UsersController>(TYPES.UserControllerInterface).to(UsersController);
iocContainer.load(buildProviderModule());
//console.log(iocContainer.get<User>)
// make inversify aware of inversify-binding-decorators

export {iocContainer};

