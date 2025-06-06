import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType, DocumentType } from 'src/users/dto/users.dto';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  document: string;

  @Column({ name: 'documenttype', type: 'enum', enum: DocumentType })
  documentType: DocumentType;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @Column({ name: 'createdat', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updatedat', type: 'timestamp' })
  updatedAt: Date;
}
