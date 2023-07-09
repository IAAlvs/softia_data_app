import { GetUserFilesDtoResponse, GetUserResponseDto, PostUserFileRequestDto, PostUserFileResponseDto } from "@/api/dtos/UserDtos";
import { UUID } from "crypto";

export interface UserServiceInterface{
    getUsers() : Promise<GetUserResponseDto[]>,
    getUser(userId : string) : Promise<GetUserResponseDto | null>,
    getUserFiles(userId : string) : Promise<GetUserFilesDtoResponse | null>,
    uploadUserFile(requestDto: PostUserFileRequestDto) : Promise<PostUserFileResponseDto>,


}