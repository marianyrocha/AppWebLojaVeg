import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('cargo')
export class Cargo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_car!: number;

    @Column({ type: 'varchar', length: 100 })
    nome_car!: string;

    @Column({ type: 'text' })
    descricao_car!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salario_car!: number;
}