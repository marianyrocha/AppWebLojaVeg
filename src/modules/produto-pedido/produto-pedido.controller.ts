import { Body, Controller, UseGuards, Get, Post, Redirect, Render, Param, Query, Req } from "@nestjs/common";
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
    async inicial(@Req() req) {

        const itens = await this.produtoPedidoService.findAll();

        return {
            titulo: 'Itens do Pedido',
            itens,
            rotaAtual: '/produto-pedido',
            funcionario: req.session.funcionario
        };
    }

    @Get('relatorio')
    @Render('produto-pedido/relatorio')
    async relatorio(@Req() req) {

        const funcionario = req.session.funcionario;
        const cargoId = funcionario?.cargo?.id_car;

        if (cargoId !== 2) {
            return {
                titulo: 'Relatório de Pedidos x Produtos',
                itens: [],
                totalItens: 0,
                quantidadeVendida: 0,
                faturamento: 0,
                rotaAtual: '/produto-pedido/relatorio',
                funcionario
            };
        }

        const itens = await this.produtoPedidoService.relatorio() || [];

        return {
            titulo: 'Relatório de Pedidos x Produtos',
            itens,
            totalItens: itens.length,
            quantidadeVendida: itens.reduce((t, i) => t + (i.quantidade_pro_ped || 0), 0),
            faturamento: itens.reduce(
                (t, i) => t + ((i.quantidade_pro_ped || 0) * (i.preco_unitario_pro_ped || 0)),
                0
            ),
            rotaAtual: '/produto-pedido/relatorio',
            funcionario
        };
    }

    @Get('criar')
    @Render('produto-pedido/formulario')
    async formulario(@Req() req, @Query('pedidoId') pedidoId?: string) {

        const pedidos = await this.pedidoService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Adicionar Produto ao Pedido',
            item: {},
            pedidos,
            produtos,
            pedidoIdSelecionado: pedidoId,
            rotaAtual: '/produto-pedido',
            funcionario: req.session.funcionario
        };
    }

    @Post('criar')
    @Redirect('/pedidos')
    async criar(@Body() dados: CreateProdutoPedidoDto) {
        await this.produtoPedidoService.create(dados);
    }

    @Get(':id/editar')
    @Render('produto-pedido/formulario')
    async editar(@Req() req, @Param('id') id: string) {

        const item = await this.produtoPedidoService.findOne(Number(id));
        const pedidos = await this.pedidoService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Editar Item',
            item,
            pedidos,
            produtos,
            pedidoIdSelecionado: item?.pedido?.id_ped,
            rotaAtual: '/produto-pedido',
            funcionario: req.session.funcionario
        };
    }

    @Post(':id/editar')
    @Redirect('/pedidos')
    async atualizar(@Param('id') id: string, @Body() dados: UpdateProdutoPedidoDto) {
        await this.produtoPedidoService.update(Number(id), dados);
    }

    @Get(':id/excluir')
    @Render('produto-pedido/excluir')
    async excluir(@Req() req, @Param('id') id: string) {

        const item = await this.produtoPedidoService.findOne(Number(id));

        return {
            titulo: 'Excluir Item',
            item,
            rotaAtual: '/produto-pedido',
            funcionario: req.session.funcionario
        };
    }

    @Post(':id/excluir')
    @Redirect('/pedidos')
    async remover(@Param('id') id: string) {
        await this.produtoPedidoService.delete(Number(id));
    }
}