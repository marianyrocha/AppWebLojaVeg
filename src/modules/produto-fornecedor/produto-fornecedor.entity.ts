import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Fornecedor } from "../fornecedor/fornecedor.entity";
import { Produto } from "../produto/produto.entity";

@Entity('produto-fornecedor')
export class ProdutoFornecedor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_pro_for!: number;

    @Column({ type: 'int' })
    quantidade_pro_for!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco_unitario_pro_for!: number;

    @ManyToOne(() => Fornecedor)
    @JoinColumn({
    name: 'fk_fornecedor_id_for'
    })
    fornecedor!: Fornecedor;

    @ManyToOne(() => Produto)
    @JoinColumn({
    name: 'fk_produto_id_pro'
    })
    produto!: Produto;
}