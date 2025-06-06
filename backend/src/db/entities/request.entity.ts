import { RequestStatus, RequestType } from 'src/requests/dto/request.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'requests' })
export class RequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RequestType })
  type: RequestType;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'uuid' })
  requester: string;

  @Column({ name: 'status', type: 'enum', enum: RequestStatus })
  status: RequestStatus;

  @Column({ name: 'createdat', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updatedat', type: 'timestamp' })
  updatedAt: Date;
}
