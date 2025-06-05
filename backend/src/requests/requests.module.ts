import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestEntity } from 'src/db/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RequestsController],
  imports: [TypeOrmModule.forFeature([RequestEntity])],
  providers: [RequestsService],
})
export class RequestsModule {}
