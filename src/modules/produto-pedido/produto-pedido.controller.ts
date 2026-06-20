import { Body, Controller, Get, Post, Param, Redirect, Render, Query } from "@nestjs/common";
import { ProdutoPedidoService } from "./produto-pedido.service";
import { PedidoService } from "../pedido/pedido.service";
import { ProdutoService } from "../produto/produto.service";

@Controller('produto-pedido')
export class ProdutoPedidoController {

    constructor(
        private produtoPedidoService: ProdutoPedidoService,
        private pedidoService: PedidoService,
        private produtoService: ProdutoService
    ) {}

    @Get()
    @Render('produto-pedido/inicial')
    async inicial() {
        const itens = await this.produtoPedidoService.findAll();
        return {
            titulo: 'Itens do Pedido',
            itens,
            rotaAtual: '/produto-pedido'
        };
    }

    @Get('criar')
    @Render('produto-pedido/formulario')
    async formulario(@Query('pedidoId') pedidoId?: string) {
        const pedidos = await this.pedidoService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Adicionar Produto ao Pedido',
            item: {},
            pedidos,
            produtos,
            pedidoIdSelecionado: pedidoId,
            rotaAtual: '/produto-pedido'
        };
    }

    @Post('criar')
    @Redirect('/pedidos')
    async criar(@Body() body: any) {
        await this.produtoPedidoService.create(body);
    }

    @Get(':id/editar')
    @Render('produto-pedido/formulario')
    async editar(@Param('id') id: string) {
        const item = await this.produtoPedidoService.findOne(Number(id));
        const pedidos = await this.pedidoService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Editar Item',
            item,
            pedidos,
            produtos,
            pedidoIdSelecionado: item?.pedido?.id_ped,
            rotaAtual: '/produto-pedido'
        };
    }

    @Post(':id/editar')
    @Redirect('/pedidos')
    async atualizar(
        @Param('id') id: string,
        @Body() body: any
    ) {
        await this.produtoPedidoService.update(Number(id), body);
    }

    @Get(':id/excluir')
    @Render('produto-pedido/excluir')
    async excluir(@Param('id') id: string) {
        const item = await this.produtoPedidoService.findOne(Number(id));

        return {
            titulo: 'Excluir Item',
            item,
            rotaAtual: '/produto-pedido'
        };
    }

    @Post(':id/excluir')
    @Redirect('/pedidos')
    async remover(@Param('id') id: string) {
        await this.produtoPedidoService.delete(Number(id));
    }
}