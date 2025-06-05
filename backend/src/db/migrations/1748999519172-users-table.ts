import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1748999519172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
    CREATE TYPE user_type_enum AS ENUM ('user', 'admin');
    CREATE TYPE document_type_enum AS ENUM ('cpf', 'cnpj');

    CREATE TABLE users (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      document VARCHAR(255) NOT NULL,
      documentType document_type_enum NOT NULL,
      password VARCHAR(255) NOT NULL,
      type user_type_enum NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP NOT NULL,

      CONSTRAINT users_pkey PRIMARY KEY (id), 
      CONSTRAINT users_document_unique UNIQUE (document)   
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
