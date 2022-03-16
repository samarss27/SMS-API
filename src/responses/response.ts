import { GenericResponse } from "./generics"

export type AppResponses<T> = GenericResponse<T>
export function GenericErrorResponse(error : string, message: string = null, type : string= "ERROR") : AppResponses<any> {
  return {
  success: false,
  error: error,
  data: message??{}
  }
}