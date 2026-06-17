import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Cargo } from "../cargo/cargo.entity";

@Entity('funcionario')
export class Funcionario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_fun!: number;

    @Column({ type: 'varchar', length: 100 })
    nome_fun!: string;

    @Column({ type: 'varchar', length: 100 })
    email_fun!: string;

    @Column({ type: 'varchar', length: 100 })
    cpf_fun!: string;

    @Column({ type: 'varchar', length: 100 })
    telefone_fun!: string;

    @Column({ type: 'date' })
    data_nascimento_fun!: Date;

    @Column({ type: 'varchar', length: 100 })
    status_fun!: string;

    @ManyToOne(() => Cargo)
    @JoinColumn({
        name: 'fk_cargo_id_car'
    })
    cargo!: Cargo;
}