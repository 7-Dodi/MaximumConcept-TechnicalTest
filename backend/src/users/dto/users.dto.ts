import {
  IsUUID,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsDate,
  Matches,
} from 'class-validator';

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

export enum DocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
}

export class UsersDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @Matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
    message: 'document must be a valid CPF or CNPJ',
  })
  document: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @MinLength(3)
  password: string;

  @IsEnum(UserType)
  type: UserType;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
