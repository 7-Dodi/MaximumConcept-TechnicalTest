import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserIdDto } from './dto/return-user-id.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return await this.usersService.create(createUser);
  }

  @Get('by-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async findGetToken(@Req() req: Request): Promise<UsersDto | null> {
    const document = req.user.document;

    return await this.usersService.findGetDocument(document);
  }

  @Get('by-id/:id')
  async findGetId(@Param('id') id: string): Promise<ReturnUserIdDto | null> {
    return await this.usersService.findGetId(id);
  }
}
