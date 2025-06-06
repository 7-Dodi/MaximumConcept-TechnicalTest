import { IsOptional, IsString } from 'class-validator';

//Definindo class
export class FindAllParamsDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  date?: string;
}
