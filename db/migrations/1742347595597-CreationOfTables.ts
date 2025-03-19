import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationOfTables1742347595597 implements MigrationInterface {
    name = 'CreationOfTables1742347595597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_94b556b24267b2d75d6d05fcd18" UNIQUE ("name"), CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "dni" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "salary" numeric(10,2) NOT NULL, "status" "public"."employee_status_enum" NOT NULL DEFAULT 'A', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "position_id" integer, CONSTRAINT "UQ_6323d6150f374a2f533d2530286" UNIQUE ("dni"), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_document" ("id" SERIAL NOT NULL, "file_path" character varying(255) NOT NULL, "employee_id" integer, "type_document_id" integer, CONSTRAINT "PK_3d42008c12e986e37ee3bdebbd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_document" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_83dcc7d899a6f4d496ac3f3fc52" UNIQUE ("name"), CONSTRAINT "PK_a89fb9f22e15824ce89c11c5a1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6ab3ec557a640017d53ac0e0ab7" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_document" ADD CONSTRAINT "FK_8e8781587c73c47dad455981089" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_document" ADD CONSTRAINT "FK_576e34b2a916e6d2747d54295dc" FOREIGN KEY ("type_document_id") REFERENCES "type_document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_document" DROP CONSTRAINT "FK_576e34b2a916e6d2747d54295dc"`);
        await queryRunner.query(`ALTER TABLE "employee_document" DROP CONSTRAINT "FK_8e8781587c73c47dad455981089"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6ab3ec557a640017d53ac0e0ab7"`);
        await queryRunner.query(`DROP TABLE "type_document"`);
        await queryRunner.query(`DROP TABLE "employee_document"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "position"`);
    }

}
