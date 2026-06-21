import { Body, Controller, Get, Post, Redirect, Render, Param } from "@nestjs/common";
import { ProdutoFornecedorService } from "./produto-fornecedor.service";
import { FornecedorService } from "../fornecedor/fornecedor.service";
import { ProdutoService } from "../produto/produto.service";

@Controller('produto-fornecedor')
export class ProdutoFornecedorController {

    constructor(
        private produtoFornecedorService: ProdutoFornecedorService,
        private fornecedorService: FornecedorService,
        private produtoService: ProdutoService
    ) {}

    @Get()
    @Render('produto-fornecedor/inicial')
    async inicial() {
        const itens = await this.produtoFornecedorService.findAll();
        return {
            titulo: 'Fornecedores dos Produtos',
            itens,
            rotaAtual: '/produto-fornecedor'
        };
    }

    @Get('criar')
    @Render('produto-fornecedor/formulario')
    async formulario() {
        const fornecedores = await this.fornecedorService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Vincular Produto ao Fornecedor',
            item: {},
            fornecedores,
            produtos,
            rotaAtual: '/produto-fornecedor/criar'
        };
    }

    @Post('criar')
    @Redirect('/produto-fornecedor')
    async criar(@Body() body: any) {
        const dadosFormatados = {
            quantidade_pro_for: Number(body.quantidade_pro_for),
            preco_unitario_pro_for: Number(body.preco_unitario_pro_for),
            produto: { id_pro: Number(body.produto_id) },
            fornecedor: { id_for: Number(body.fornecedor_id) }
        };

        await this.produtoFornecedorService.create(dadosFormatados);
    }

    @Get(':id/editar')
    @Render('produto-fornecedor/formulario')
    async editar(@Param('id') id: string) {
        const item = await this.produtoFornecedorService.findOne(Number(id));
        const fornecedores = await this.fornecedorService.findAll();
        const produtos = await this.produtoService.findAll();

        return {
            titulo: 'Editar Vínculo',
            item,
            fornecedores,
            produtos,
            rotaAtual: '/produto-fornecedor'
        };
    }

    @Post(':id/editar')
    @Redirect('/produto-fornecedor')
    async atualizar(@Param('id') id: string, @Body() body: any) {
        await this.produtoFornecedorService.update(Number(id), body);
    }

    @Get(':id/excluir')
    @Render('produto-fornecedor/excluir')
    async excluir(@Param('id') id: string) {
        const item = await this.produtoFornecedorService.findOne(Number(id));
        return {
            titulo: 'Excluir Vínculo',
            item,
            rotaAtual: '/produto-fornecedor'
        };
    }

    @Post(':id/excluir')
    @Redirect('/produto-fornecedor')
    async remover(@Param('id') id: string) {
        await this.produtoFornecedorService.delete(Number(id));
    }
}