import { IsEnum } from 'class-validator';
import { RequestStatus } from './request.dto';

// Definindo class
export class UpdateStatusRequestDto {
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
