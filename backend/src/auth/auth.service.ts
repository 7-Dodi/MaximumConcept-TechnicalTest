import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpiresInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpiresInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    )!;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findGetDocument(
      loginUserDto.document,
    );

    if (
      !foundUser ||
      !bcryptCompare(loginUserDto.password, foundUser.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: foundUser.id,
      document: loginUserDto.document,
      type: foundUser.type,
    };

    const token = this.jwtService.sign(payload);

    return {
      token: token,
      expiresIn: Number(this.jwtExpiresInSeconds),
    };
  }
}
