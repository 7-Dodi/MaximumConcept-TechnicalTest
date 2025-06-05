import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestDto, RequestStatus, RequestType } from './dto/request.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';
import { FindAllParamsDto } from './dto/find-all-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from 'src/db/entities/request.entity';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserType } from 'src/users/dto/users.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}

  private requests: RequestDto[] = [];

  async create(request: CreateRequestDto, requester: string) {
    const dbRequest = new RequestEntity();

    dbRequest.type = request.type;
    dbRequest.address = request.address;
    dbRequest.description = request.description;
    dbRequest.requester = requester;
    dbRequest.status = request.status;
    dbRequest.createdAt = new Date();
    dbRequest.updatedAt = new Date();

    const { id } = await this.requestRepository.save(dbRequest);

    return { id };
  }

  async findGetId(id: string): Promise<RequestDto> {
    const requestFound = await this.requestRepository.findOne({
      where: { id },
    });

    if (!requestFound) {
      throw new HttpException(
        `Request with ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.adapterEntityToDto(requestFound);
  }

  async findAll(params: FindAllParamsDto): Promise<RequestDto[]> {
    const searchParams: FindOptionsWhere<RequestEntity> = {};

    if (params.status) {
      searchParams.status = params.status as RequestStatus;
    }
    if (params.type) {
      searchParams.type = params.type as RequestType;
    }
    if (params.date) {
      const date = new Date(params.date);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));
      searchParams.createdAt = Between(start, end);
    }

    const requestsFound = await this.requestRepository.find({
      where: searchParams,
    });

    return requestsFound.map((request) => this.adapterEntityToDto(request));
  }

  async updateStatus(id: string, body: UpdateStatusRequestDto) {
    const foundRequest = await this.requestRepository.findOne({
      where: { id },
    });

    if (!foundRequest) {
      throw new HttpException(
        `Request with ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.requestRepository.update(
      { id },
      { status: body.status, updatedAt: new Date() },
    );
  }

  async delete(id: string, requester: string, requesterType: UserType) {
    const requestFound = await this.requestRepository.findOne({
      where: { id },
    });

    if (!requestFound) {
      throw new HttpException(
        `Request with ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      requesterType !== UserType.ADMIN &&
      requestFound.requester !== requester
    ) {
      throw new HttpException(
        `Requester ${requester} does not have permission to delete this request`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.requestRepository.delete({ id });
  }

  private adapterEntityToDto(request: RequestEntity): RequestDto {
    return {
      id: request.id,
      type: request.type,
      address: request.address,
      description: request.description,
      requester: request.requester,
      status: request.status,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };
  }
}
