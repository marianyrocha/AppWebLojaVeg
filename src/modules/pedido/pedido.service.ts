import { Injectable } from "@nestjs/common";
import { Pedido } from "./pedido.entity";
import { Clientes } from "../cliente/cliente.entity";
import { Funcionario } from "../funcionario/funcionario.entity";


@Injectable()
export class PedidoService {
    
    async findAll(): Promise<Pedido[]> {
        return Pedido.find();
    }

    async create(dados: any): Promise<Pedido> {
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

}

