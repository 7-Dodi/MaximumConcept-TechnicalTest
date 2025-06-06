import {
  IsUUID,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsDate,
} from 'class-validator';

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

export enum DocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
}

export class ReturnUserIdDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsEnum(UserType)
  type: UserType;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
