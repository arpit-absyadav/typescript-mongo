import { IsString, IsJWT } from 'class-validator';

export class AccessTokenUpdateValidator {

  @IsJWT()
  @IsString()
  refresh_token: string;
}
