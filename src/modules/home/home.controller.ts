import { Controller, Get, UseGuards, Render } from '@nestjs/common';
import { ProdutoService } from '../produto/produto.service';
import { PedidoService } from '../pedido/pedido.service';
import { ClienteService } from '../cliente/cliente.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';
import { Produto } from '../produto/produto.entity';
import { LessThan } from 'typeorm';
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

@UseGuards(AutenticacaoGuard)
@Controller()
export class HomeController {

    constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private fornecedorService: FornecedorService
) {}

    @Get()
    @Render('home/inicial')
    async inicial() {

        const totalProdutos =
            (await this.produtoService.findAll()).length;

        const totalPedidos =
            (await this.pedidoService.findAll()).length;

        const totalClientes =
            (await this.clienteService.findAll()).length;

        const totalFornecedores =
            (await this.fornecedorService.findAll()).length;

        const estoqueBaixo = await Produto.find({
            where: {
            quantidade_pro: LessThan(5)
        }
        });

        const produtos = await this.produtoService.findAll();

        const valorEstoque = produtos.reduce(
            (soma, produto) =>
                soma + (produto.quantidade_pro * produto.preco_pro),
            0
        );

        const produtosCaros =
        produtos.sort(
            (a, b) => b.preco_pro - a.preco_pro
        ).slice(0, 5);

        const ultimosPedidos =
        (await this.pedidoService.findAll())
        .slice(-5);

        return {
            titulo: 'Dashboard',
            rotaAtual: '/',
            totalProdutos,
            totalPedidos,
            totalClientes,
            totalFornecedores,
            estoqueBaixo,
            valorEstoque,
            produtosCaros,
            ultimosPedidos

        };

        
}
      
}