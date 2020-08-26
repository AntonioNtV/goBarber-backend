import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1598392509168
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}

/**
 * Linha do Tempo
 *
 * Primeira semana: Agendamentos
 * Segunda semana: Usuárops
 *
 * Terceira semana: (NOVO DEV) Edição em Agendamentos
 * Quarta semana: Compras
 *p
 */
