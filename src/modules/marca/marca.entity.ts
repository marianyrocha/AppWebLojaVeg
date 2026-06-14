import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('marcas')
export class Marcas extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_mar!: number;

    @Column({ type: 'varchar', length: 100 })
    nome_mar!: string;

    @Column({ type: 'varchar', length: 100 })
    contato_mar!: string;
}