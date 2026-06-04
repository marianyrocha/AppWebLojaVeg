
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Marca } from "../marca/marca.entity";
import { Categoria } from "../categoria/categoria.entity";

@Entity('produtos')
export class Produto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_pro!: number;

    @Column({ type: 'varchar', length: 200 })
    nome_pro!: string;

    @Column({ type: 'varchar', length: 200 })
    descricao_pro!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco_pro!: number;

    @Column({ type: 'int'})
    quantidade_pro!: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    imagem_pro?: string;

    @Column({ type: 'varchar', length: 200 })
    status_pro!: string;

    @ManyToOne(() => Marca)
    @JoinColumn({
        name: 'fk_marca_id_mar'
    })
    marca!: Marca;

    @ManyToOne(() => Categoria)
    @JoinColumn({
        name: 'fk_categoria_id_cat'
    })
    categoria!: Categoria;

}