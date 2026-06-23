import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Endereco } from "../endereco/endereco.entity";

@Entity('clientes')
export class Clientes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_cli!: number;

    @Column({ type: 'varchar', length: 100 })
    nome_cli!: string;

    @Column({ type: 'varchar', length: 100 })
    telefone_cli!: string;

    @Column({ type: 'varchar', length: 100 })
    email_cli!: string;

    @Column({ type: 'date' })
    data_nascimento_cli!: Date;

    @ManyToOne(() => Endereco)
    @JoinColumn({ name: 'fk_endereco_id_end' })
    endereco!: Endereco;
}