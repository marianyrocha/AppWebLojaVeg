import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('endereco')
export class Endereco extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_end!: number;

    @Column({ type: 'varchar', length: 100 })
    rua_end!: string;

    @Column({ type: 'varchar', length: 100 })
    bairro_end!: string;

    @Column({ type: 'int' })
    numero_end!: number;

    @Column({ type: 'varchar', length: 100 })
    cidade_end!: string;

    @Column({ type: 'varchar', length: 100 })
    estado_end!: string;

    @Column({ type: 'int' })
    cep_end!: number;
}