
import { BaseEntity, OneToMany, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Clientes } from "../cliente/cliente.entity";
import { Funcionario } from "../funcionario/funcionario.entity";
import { ProdutoPedido } from "../produto-pedido/produto-pedido.entity";

@Entity('pedidos')
export class Pedido extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_ped!: number;

    @Column({ type: 'date'})
    data_ped!: Date;

    @Column({ type: 'varchar', length: 100 })
    status_ped!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor_ped!: number;

    @Column({ type: 'varchar', length: 100})
    forma_pagamento_ped!: string;

    @Column({ type: 'varchar', length: 200 })
    canal_ped?: string;


    @ManyToOne(() => Clientes)
    @JoinColumn({
        name: 'fk_cliente_id_cli'
    })
    cliente!: Clientes;

    @ManyToOne(() => Funcionario)
    @JoinColumn({
        name: 'fk_funcionario_id_fun'
    })
    funcionario!: Funcionario;

    @OneToMany(() => ProdutoPedido, (produtoPedido) => produtoPedido.pedido)
    produtoPedidos!: ProdutoPedido[];

}