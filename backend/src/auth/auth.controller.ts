import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(loginUserDto);
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verify() {
    return 'OK';
  }
}
