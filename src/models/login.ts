import { IsBoolean, IsBooleanString, IsDate, IsDateString, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";

export class PostSMS {
  @IsString()
  @IsNotEmpty()
  public hash: string;
  @IsString()
  @IsNotEmpty()
  public server_number: string = "001";
  @IsString()
  @IsNotEmpty()
  public phone: string;
  @IsNumber()
  @IsNotEmpty()
  public direction: number;
  @IsNumber()
  @IsNotEmpty()
  public status: number;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public message: string;
  @IsString()
  @IsNotEmpty()
  public received_on:string;
}

export class FetchSMS {
  @IsString()
  @IsNotEmpty()
  public hash: string;
  @IsString()
  @IsNotEmpty()
  public server_number: string = "001";
  @IsString()
  @IsNotEmpty()
  public phone: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public message: string;
}

export class SentSMS {
  @IsString()
  @IsNotEmpty()
  public uuid: string;
  @IsString()
  @IsNotEmpty()
  public hash: string;
  @IsNumber()
  @IsNotEmpty()
  public status: number;
}

export class Registration {
  @IsString()
  @IsNotEmpty()
  public device_ID: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public requested_On: string;
  @IsNotEmpty()
  @IsBooleanString()
  public approved: boolean;
  @IsNotEmpty()
  @IsDateString()
  public approved_On: Date;
  @IsString()
  @IsNotEmpty()
  public appproved_By: string;
}

export class Login {
  @IsString()
  @IsNotEmpty()
  public device_ID: string;
  @IsString()
  @IsNotEmpty()
  public application_Version: string;
  @IsString()
  @IsNotEmpty()
  public Application_ID: string;
  @IsString()
  @IsNotEmpty()
  public IP_Address: string;
  @IsString()
  @IsNotEmpty()
  public Route: string;
}




/* export class device_loggin {
  @IsString()
  @IsNotEmpty()
  public device_ID: string;
  @IsString()
  @IsNotEmpty()
  public application_Version: string;
  @IsString()
  @IsNotEmpty()
  public Application_ID: string;
  @IsString()
  @IsNotEmpty()
  public IP_Address: string;
  @IsString()
  @IsNotEmpty()
  public Route: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public createdAt: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public updatedAt:string;
}

export class DeviceRegistration {
  @IsString()
  @IsNotEmpty()
  public device_ID: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public requested_On: string;
  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  public approved: string;
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public approved_On: string;
  @IsString()
  @IsNotEmpty()
  public appproved_By: string;
}


 */