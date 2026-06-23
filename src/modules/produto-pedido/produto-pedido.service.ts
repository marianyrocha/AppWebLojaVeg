import { Injectable } from "@nestjs/common";
import { ProdutoPedido } from "./produto-pedido.entity";
import { Pedido } from "../pedido/pedido.entity";
import { Produto } from "../produto/produto.entity";
import { CreateProdutoPedidoDto } from "./dtos/create-produto-pedido.dto";
import { UpdateProdutoPedidoDto } from "./dtos/update-produto-pedido.dto";

@Injectable()
export class ProdutoPedidoService {

    private async atualizarValorTotalPedido(idPedido: number) {
        const itens = await ProdutoPedido.find({
            where: { pedido: { id_ped: idPedido } }
        });

        const novoValorTotal = itens.reduce((soma, item) => {
            return soma + (
                Number(item.quantidade_pro_ped) *
                Number(item.preco_unitario_pro_ped)
            );
        }, 0);

        await Pedido.update(
            { id_ped: idPedido },
            { valor_ped: novoValorTotal }
        );
    }

    async findAll(): Promise<ProdutoPedido[]> {
        return ProdutoPedido.find({
            relations: ['pedido', 'produto']
        });
    }

    async findOne(id: number): Promise<ProdutoPedido | null> {
        return ProdutoPedido.findOne({
            where: { id_pro_ped: id },
            relations: ['pedido', 'produto']
        });
    }

    async create(dados: CreateProdutoPedidoDto): Promise<ProdutoPedido> {

        const produto = await Produto.findOne({
            where: {
                id_pro: Number(dados.produto_id)
            }
        });

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        if (!dados.quantidade_pro_ped) {
            throw new Error('Quantidade não informada');
        }

        if (produto.quantidade_pro < dados.quantidade_pro_ped) {
            throw new Error('Estoque insuficiente');
        }

        produto.quantidade_pro -= dados.quantidade_pro_ped;
        await produto.save();

        const produtoPedido = ProdutoPedido.create({
            quantidade_pro_ped: dados.quantidade_pro_ped,
            preco_unitario_pro_ped: dados.preco_unitario_pro_ped,
            pedido: {
                id_ped: dados.pedido_id
            } as Pedido,

            produto: {
                id_pro: dados.produto_id
            } as Produto

            
        });

        const itemSalvo = await produtoPedido.save();

        await this.atualizarValorTotalPedido(
            Number(dados.pedido_id)
        );

        return itemSalvo;
    }

    async update(id: number, dados: UpdateProdutoPedidoDto) {

        const itemAnterior = await this.findOne(id);

        if (!itemAnterior) {
            throw new Error('Item não encontrado');
        }

        const produto = await Produto.findOne({
            where: {
                id_pro: itemAnterior.produto.id_pro
            }
        });

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        produto.quantidade_pro += itemAnterior.quantidade_pro_ped;

        if (!dados.quantidade_pro_ped) {
            throw new Error('Quantidade não informada');
        }

        if (produto.quantidade_pro < dados.quantidade_pro_ped) {
            throw new Error('Estoque insuficiente');
        }

        produto.quantidade_pro -= dados.quantidade_pro_ped;

        await produto.save();

        await ProdutoPedido.update(
            { id_pro_ped: id },
            {
                quantidade_pro_ped: dados.quantidade_pro_ped,
                preco_unitario_pro_ped: dados.preco_unitario_pro_ped
            }
        );

        await this.atualizarValorTotalPedido(
            itemAnterior.pedido.id_ped
        );
    }

    async delete(id: number) {

        const item = await this.findOne(id);

        if (!item) {
            return;
        }

        const produto = await Produto.findOne({
            where: {
                id_pro: item.produto.id_pro
            }
        });

        if (produto) {
            produto.quantidade_pro += item.quantidade_pro_ped;
            await produto.save();
        }

        const idPedido = item.pedido.id_ped;

        await ProdutoPedido.delete({
            id_pro_ped: id
        });

        await this.atualizarValorTotalPedido(idPedido);
    }

    async relatorio(): Promise<ProdutoPedido[]> {
    return ProdutoPedido.find({
        relations: {
            pedido: true,
            produto: true
        },
        order: {
            id_pro_ped: 'DESC'
        }
    });
}

}