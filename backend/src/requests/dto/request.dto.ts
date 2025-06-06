import {
  IsDate,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

// Definindo o tipo de estado para o serviço de requisição
export enum RequestStatus {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDO = 'concluido',
}

// Definfindo o tipo de requisição
export enum RequestType {
  TROCA_LAMPADA = 'troca_lampada',
  TAPA_BURACO = 'tapa_buraco',
}

export class RequestDto {
  @IsUUID()
  id: string;

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

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  requester: string;

  @IsEnum(RequestStatus)
  status: RequestStatus;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
