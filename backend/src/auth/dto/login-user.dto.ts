import { IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  document: string;

  @IsString()
  @MinLength(3)
  password: string;
}
