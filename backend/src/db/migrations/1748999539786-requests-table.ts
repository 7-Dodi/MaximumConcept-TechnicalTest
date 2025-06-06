import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1748999539786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
    CREATE TYPE request_type_enum AS ENUM ('troca_lampada', 'tapa_buraco');
    CREATE TYPE status_type_enum AS ENUM ('pendente', 'em_andamento', 'concluido');

    CREATE TABLE requests (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      type request_type_enum NOT NULL,
      address VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      requester uuid NOT NULL,
      status status_type_enum NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP NOT NULL,

      CONSTRAINT requests_pkey PRIMARY KEY (id),    
      CONSTRAINT requests_requester_fkey FOREIGN KEY (requester) REFERENCES users(id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS requests;`);
  }
}
