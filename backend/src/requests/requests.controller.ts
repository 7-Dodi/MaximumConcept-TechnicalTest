import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestDto } from './dto/request.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';
import { FindAllParamsDto } from './dto/find-all-params.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Request } from 'express';
import { RequestParametersDto } from './dto/request-parameters.dto';
import { UserType } from 'src/users/dto/users.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Roles('user')
  async create(@Body() createRequest: CreateRequestDto, @Req() req: Request) {
    const requester = req.user.id;

    return this.requestsService.create(createRequest, requester);
  }

  @Get('/:id')
  @Roles('admin', 'user')
  async findGetId(@Param() params: RequestParametersDto): Promise<RequestDto> {
    return await this.requestsService.findGetId(params.id);
  }

  @Get()
  @Roles('admin', 'user')
  async findAll(@Query() params: FindAllParamsDto): Promise<RequestDto[]> {
    return await this.requestsService.findAll(params);
  }

  @Patch('/:id')
  @Roles('admin')
  async updateStatus(
    @Param() params: RequestParametersDto,
    @Body() request: UpdateStatusRequestDto,
  ) {
    return await this.requestsService.updateStatus(params.id, request);
  }

  @Delete('/:id')
  @Roles('admin', 'user')
  async delete(@Param() params: RequestParametersDto, @Req() req: Request) {
    const requester = req.user.id;
    const requesterType = req.user.type;

    return await this.requestsService.delete(
      params.id,
      requester,
      requesterType as UserType,
    );
  }
}
