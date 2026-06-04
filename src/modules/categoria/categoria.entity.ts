import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('categoria')
export class Categoria extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_cat!: number;

    @Column({ type: 'varchar', length: 100 })
    nome_cat!: string;

    @Column({ type: 'text' })
    descricao_cat!: string;

    @Column({ type: 'varchar', length: 100 })
    status_cat!: string;
}