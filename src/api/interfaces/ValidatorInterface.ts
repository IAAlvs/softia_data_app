import { ValidationError } from "./ValidationError"
export interface ValidatorInterface<T>{
    validateData(dataType : T): void | ValidationError
}