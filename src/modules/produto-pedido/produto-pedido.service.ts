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
            return soma + (Number(item.quantidade_pro_ped) * Number(item.preco_unitario_pro_ped));
        }, 0);

        await Pedido.update({ id_ped: idPedido }, { valor_ped: novoValorTotal });
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
        const produtoPedido = ProdutoPedido.create({
            quantidade_pro_ped: dados.quantidade_pro_ped,
            preco_unitario_pro_ped: dados.preco_unitario_pro_ped,
            pedido: {
                id_ped: Number(dados.pedido_ped)
            } as Pedido,
            produto: {
                id_pro: Number(dados.produto_pro)
            } as Produto
        });

        const itemSalvo = await produtoPedido.save();

        if (dados.pedido_ped) {
            await this.atualizarValorTotalPedido(Number(dados.pedido_ped));
        }

        return itemSalvo;
    }

    async update(id: number, dados: UpdateProdutoPedidoDto) {
        await ProdutoPedido.update(
            { id_pro_ped: id },
            {
                quantidade_pro_ped: dados.quantidade_pro_ped,
                preco_unitario_pro_ped: dados.preco_unitario_pro_ped
            }
        );

        const itemAtualizado = await this.findOne(id);
        if (itemAtualizado && itemAtualizado.pedido) {
            await this.atualizarValorTotalPedido(itemAtualizado.pedido.id_ped);
        }
    }

    async delete(id: number) {
        const item = await this.findOne(id);
        const idPedido = item?.pedido?.id_ped;

        await ProdutoPedido.delete({ id_pro_ped: id });

        if (idPedido) {
            await this.atualizarValorTotalPedido(idPedido);
        }
    }
}