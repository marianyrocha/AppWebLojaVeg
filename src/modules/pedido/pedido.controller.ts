import { Body, Controller, UseGuards, Param, Get, Post, Redirect, Render } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { ClienteService } from "../cliente/cliente.service";
import { FuncionarioService } from "../funcionario/funcionario.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

@UseGuards(AutenticacaoGuard)
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

        const cliente = await this.clienteService.findAll();
        const funcionario = await this.funcionarioService.findAll();

        return {
            titulo: 'Cadastro de pedidos',
            rotaAtual: '/pedidos/criar',
            pedido: {}, 
            cliente,
            funcionario

       }
    }

    @Post('criar')
    @Redirect('/pedidos/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.pedidoService.create(body);
    }
    @Get(':id/editar')
        @Render('pedido/formulario')
        async editar(@Param('id') id: string) {
    
        const pedido = await this.pedidoService.findOne(Number(id));
        const cliente = await this.clienteService.findAll();
        const funcionario = await this.funcionarioService.findAll();
    
        return {
            titulo: 'Editar pedido',
            pedido,
            cliente,
            funcionario,
            rotaAtual: '/pedidos'
            };
        }
    
        @Post(':id/editar')
        @Redirect('/pedidos')
        async atualizar(
        @Param('id') id: number,
        @Body() body: any
        ) {
        await this.pedidoService.update(Number(id), body);
        }
    
       @Get(':id/excluir')
        @Render('pedido/excluir')
        async excluir(@Param('id') id: string) {
    
            const pedido = await this.pedidoService.findOne(Number(id));
    
            return {
                titulo: 'Excluir pedido',
                pedido,
                rotaAtual: '/pedidos'
            };
        }
    
        @Post(':id/excluir')
        @Redirect('/pedidos')
        async remover(@Param('id') id: string) {
    
            await this.pedidoService.delete(Number(id));
        }

}