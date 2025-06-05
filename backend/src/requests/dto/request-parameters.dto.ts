import { IsUUID } from 'class-validator';

export class RequestParametersDto {
  @IsUUID()
  id: string;
}
