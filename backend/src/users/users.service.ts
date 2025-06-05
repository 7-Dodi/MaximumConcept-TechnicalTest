import { ConflictException, Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync as bcryptHash } from 'bcrypt';
import { ReturnUserIdDto } from './dto/return-user-id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  private readonly users: UsersDto[] = [];

  async create(user: CreateUserDto) {
    const userAlreadyExists = await this.findGetDocument(user.document);

    if (userAlreadyExists) {
      throw new ConflictException('User with document already exists');
    }

    const dbUser = new UserEntity();
    dbUser.name = user.name;
    dbUser.document = user.document;
    dbUser.documentType = user.documentType;
    dbUser.password = bcryptHash(user.password, 10);
    dbUser.type = user.type;
    dbUser.createdAt = new Date();
    dbUser.updatedAt = new Date();

    const { id } = await this.usersRepository.save(dbUser);

    return { id };
  }

  async findGetDocument(document: string): Promise<UsersDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { document },
    });

    if (!userFound) return null;

    return {
      id: userFound.id,
      name: userFound.name,
      document: userFound.document,
      documentType: userFound.documentType,
      password: userFound.password,
      type: userFound.type,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
  }

  async findGetId(id: string): Promise<ReturnUserIdDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userFound) return null;

    return {
      id: userFound.id,
      name: userFound.name,
      type: userFound.type,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
  }
}
