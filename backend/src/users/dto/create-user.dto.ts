import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DocumentType, UserType } from './users.dto';

export class CreateUserDto {
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
  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  type: UserType;
}
