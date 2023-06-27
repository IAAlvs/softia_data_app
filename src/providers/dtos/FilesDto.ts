import { UUID } from "crypto"

export interface FilesDto{
    id : UUID,
    fileName : string ,
    fileType : string ,
    data : string ,
    fileSize : number ,
    fileUrl? : string 
};