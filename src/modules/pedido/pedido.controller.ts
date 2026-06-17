import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { ClienteService } from "../cliente/cliente.service";
import { FuncionarioService } from "../funcionario/funcionario.service";

@Controller('pedidos')
export class PedidoController {

    constructor(
        private pedidoService: PedidoService,
        private clienteService: ClienteService,
        private funcionarioService: FuncionarioService
    ) {}

    @Get()
    @Render('pedido/inicial')
    async inicial(): Promise<object> {

        const listapedidos = await this.pedidoService.findAll();

        return {
            titulo: 'Consulta de pedidos',
            pedidos: listapedidos,
            rotaAtual: '/pedidos'
        }
    }

    @Get('criar')
    @Render('pedido/formulario')
    async formulario(): Promise<object> {

        const clientes = await this.clienteService.findAll();
        const funcionarios = await this.funcionarioService.findAll();

        return {
            titulo: 'Cadastro de pedidos',
            rotaAtual: '/pedidos/criar',
            pedido: {}, 
            clientes,
            funcionarios
       }
    }

    @Post('criar')
    @Redirect('/pedidos/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.pedidoService.create(body);
    }

}