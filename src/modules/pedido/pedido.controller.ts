import { Body, Controller, UseGuards, Param, Get, Post, Redirect, Render, Query, Req, Res } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { ClienteService } from "../cliente/cliente.service";
import { FuncionarioService } from "../funcionario/funcionario.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreatePedidoDto } from "./dtos/create-pedido.dto";
import { UpdatePedidoDto } from "./dtos/update-pedido.dto";

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
    async inicial(@Req() req, @Query('termo') termo: string) {
        const funcionario = req.session?.funcionario;

        const listaPedidos = termo
            ? await this.pedidoService.buscar(termo)
            : await this.pedidoService.findAll();

        return {
            titulo: 'Consulta de pedidos',
            pedidos: listaPedidos,
            termo,
            rotaAtual: '/pedidos',
            cliente: await this.clienteService.findAll(),
            funcionario: await this.funcionarioService.findAll(),
            usuarioLogado: funcionario
        };
    }
    
    @Get('criar')
    @Render('pedido/formulario')
    async formulario() {
        const clientes = await this.clienteService.findAll();
        const funcionarios = await this.funcionarioService.findAll();

        return {
            titulo: 'Cadastro de pedidos',
            rotaAtual: '/pedidos/criar',
            pedido: {},
            clientes,
            funcionarios
        };
    }

    @Post('criar')
    @Redirect('/pedidos')
    async criar(@Body() dados: CreatePedidoDto) {
        await this.pedidoService.create(dados);
    }

    @Get(':id/editar')
    @Render('pedido/formulario')
    async editar(@Param('id') id: string) {
        const pedido = await this.pedidoService.findOne(Number(id));
        const clientes = await this.clienteService.findAll();
        const funcionarios = await this.funcionarioService.findAll();

        return {
            titulo: 'Editar pedido',
            pedido,
            clientes,
            funcionarios,
            rotaAtual: '/pedidos'
        };
    }

    @Post(':id/editar')
    @Redirect('/pedidos')
    async atualizar(@Param('id') id: string, @Body() body: UpdatePedidoDto) {
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