import { Body, Controller, UseGuards, Get, Post, Redirect, Render, Param, Query } from "@nestjs/common";
import { ProdutoPedidoService } from "./produto-pedido.service";
import { PedidoService } from "../pedido/pedido.service";
import { ProdutoService } from "../produto/produto.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateProdutoPedidoDto } from "./dtos/create-produto-pedido.dto";
import { UpdateProdutoPedidoDto } from "./dtos/update-produto-pedido.dto";

@UseGuards(AutenticacaoGuard)
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

    @Get('relatorio')
    @Render('produto-pedido/relatorio')
    async relatorio() {
        const itens = await this.produtoPedidoService.relatorio();
        const totalItens = itens.length;
        const quantidadeVendida = itens.reduce((total, item) => total + item.quantidade_pro_ped, 0);
        const faturamento = itens.reduce((total, item) => total + (item.quantidade_pro_ped * item.preco_unitario_pro_ped), 0);

        return {
            titulo: 'Relatório de Pedidos x Produtos',
            itens,
            totalItens,
            quantidadeVendida,
            faturamento,
            rotaAtual: '/produto-pedido/relatorio'
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
    async criar(@Body() dados: CreateProdutoPedidoDto) {
        await this.produtoPedidoService.create(dados);
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
    async atualizar(@Param('id') id: string, @Body() dados: UpdateProdutoPedidoDto) {
        await this.produtoPedidoService.update(Number(id), dados);
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