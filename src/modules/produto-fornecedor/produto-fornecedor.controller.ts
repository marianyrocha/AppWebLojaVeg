import { Body, Controller, Get, UseGuards, Post, Redirect, Render, Param } from "@nestjs/common";
import { ProdutoFornecedorService } from "./produto-fornecedor.service";
import { FornecedorService } from "../fornecedor/fornecedor.service";
import { ProdutoService } from "../produto/produto.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateProdutoFornecedorDto } from "./dtos/create-produto-fornecedor.dto";
import { UpdateProdutoDtoFornecedorDto } from "./dtos/update-produto-fornecedor.dto";

@UseGuards(AutenticacaoGuard)
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
    async criar(@Body() dados: CreateProdutoFornecedorDto) {
        await this.produtoFornecedorService.create(dados);
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
    async atualizar(@Param('id') id: number, @Body() dados: UpdateProdutoDtoFornecedorDto) {
        await this.produtoFornecedorService.update(Number(id), dados);
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