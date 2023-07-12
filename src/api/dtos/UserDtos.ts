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
export interface FileDto{
    id : UUID,
    fileSize : number,
    fileType : string
    dropDate : Date
    visible : string 
    createdAt : Date
    updatedAt : Date
}
export interface GetUserFilesDtoResponse{
    userId : UUID,
    files : Array<FileDto>
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