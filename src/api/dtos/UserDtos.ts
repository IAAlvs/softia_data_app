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