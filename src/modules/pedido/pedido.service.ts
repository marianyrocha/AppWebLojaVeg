import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Clientes } from "../cliente/cliente.entity";
import { Funcionario } from "../funcionario/funcionario.entity";
import { CreatePedidoDto } from "./dtos/create-pedido.dto";
import { UpdateProdutoPedidoDto } from "../produto-pedido/dtos/update-produto-pedido.dto";
import { UpdatePedidoDto } from "./dtos/update-pedido.dto";

@Injectable()
export class PedidoService {
    
    async findAll(): Promise<Pedido[]> {
        return Pedido.find({
            relations: ['cliente', 'funcionario', 'produtoPedidos', 'produtoPedidos.produto']
        }); 
    }

    async buscar(termo: string): Promise<Pedido[]> {
        return Pedido.find({
            where: [
            { status_ped: Like(`%${termo}%`) },
            { cliente: { nome_cli: Like(`%${termo}%`) } },
            { funcionario: { nome_fun: Like(`%${termo}%`) } }
        ],

        relations: ['cliente', 'funcionario', 'produtoPedidos', 'produtoPedidos.produto']
        });
    }

    async findOne(id: number): Promise<Pedido | null> {
        return Pedido.findOne({
            where: {
                id_ped: id
            },
            relations: ['cliente', 'funcionario']
        });
    }

    async create(dados: CreatePedidoDto): Promise<Pedido> {
        const pedido = Pedido.create({ 
            data_ped: dados.data_ped,
            status_ped: dados.status_ped,
            valor_ped: dados.valor_ped,
            forma_pagamento_ped: dados.forma_pagamento_ped,
            canal_ped: dados.canal_ped,
            cliente: {
                id_cli: Number(dados.cliente_ped)
            } as Clientes,
            funcionario: {
                id_fun: Number(dados.funcionario_ped)
            } as Funcionario 
        });

        return pedido.save();
    }

    async update(id: number, dados: UpdatePedidoDto) {
        await Pedido.update({ id_ped: id }, {
            data_ped: dados.data_ped,
            status_ped: dados.status_ped,
            valor_ped: dados.valor_ped,
            forma_pagamento_ped: dados.forma_pagamento_ped,
            canal_ped: dados.canal_ped,
        });
    }
    
    async delete(id: number) {
        await Pedido.delete({
            id_ped: id
        });
    }
}