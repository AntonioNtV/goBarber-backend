import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

/**
 * Um pra Um (OneToOne) -> Um usuario tem um agendamento
 * Um para Muitos (OneToMany) -> Um Usuario tem multiplos Agendamentos
 * Muitos para Muitos (ManyToMany) -> Muito Usuarios tem multiplos agendamentos
 */

// KISS - KEEP IT SIMPLE AND STUPID
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User) // Muitos appointments para um User
    @JoinColumn({ name: 'provider_id' }) // Join de tabelas com base em um campo
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
