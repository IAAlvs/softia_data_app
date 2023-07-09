import { UUID } from "crypto"
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
export interface PostUserFileRequestDto{
    userId : string, 
    fileId : string,
    fileSize : number,
    fileType : string,
    dropDate : string,
    visible? : boolean
}
export interface PostUserFileResponseDto{
    userId : string, 
    fileId : string,
    fileSize : number,
    fileType : string,
    dropDate : string,
    visible : boolean,
    createdAt : Date,
    updatedAt : Date, 
}