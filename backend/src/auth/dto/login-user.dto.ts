import { IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
    message: 'document must be a valid CPF or CNPJ',
  })
  document: string;

  @IsString()
  @MinLength(3)
  password: string;
}
