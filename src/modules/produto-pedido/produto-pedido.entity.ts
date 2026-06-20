import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Pedido } from "../pedido/pedido.entity";
import { Produto } from "../produto/produto.entity";

@Entity('produto-pedido')
export class ProdutoPedido extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_pro_ped!: number;

    @Column({ type: 'int' })
    quantidade_pro_ped!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco_unitario_pro_ped!: number;

    @ManyToOne(() => Pedido)
    @JoinColumn({
        name: 'fk_pedido_id_ped'
    })
    pedido!: Pedido;

    @ManyToOne(() => Produto)
    @JoinColumn({
        name: 'fk_produto_id_pro'
    })
    produto!: Produto;
}