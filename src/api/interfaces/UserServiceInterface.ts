import { GetUserResponseDto } from "@/api/dtos/UserDtos";
import { UUID } from "crypto";

export interface UserServiceInterface{
    getUsers() : Promise<GetUserResponseDto[]>,
    getUser(userId : string) : Promise<GetUserResponseDto | null>
}