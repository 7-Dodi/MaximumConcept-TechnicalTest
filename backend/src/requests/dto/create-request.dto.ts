import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { RequestStatus, RequestType } from './request.dto';

export class CreateRequestDto {
  @IsEnum(RequestType)
  type: RequestType;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  address: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @IsEnum(RequestStatus)
  status: RequestStatus;
}
