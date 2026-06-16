import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('fornecedor')
export class Fornecedor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_for!: number;

    @Column({ type: 'varchar', length: 200 })
    nome_for!: string;

    @Column({ type: 'varchar', length: 200})
    email_for!: string;

    @Column({ type: 'varchar', length: 200 })
    telefone_for!: string;

    @Column({ type: 'varchar', length: 200 })
    razao_social_for!: string;

    @Column({ type: 'varchar', length: 200 })
    cnpj_for!: string;
}