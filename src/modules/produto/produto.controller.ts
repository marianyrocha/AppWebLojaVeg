import { Body, Controller, UseGuards, Param, Get, Post, Redirect, Render } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { MarcaService } from "../marca/marca.service";
import { CategoriaService } from "../categoria/categoria.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

@UseGuards(AutenticacaoGuard)
@Controller('produtos')
export class ProdutoController {

    constructor(
        private produtoService: ProdutoService,
        private marcaService: MarcaService,
        private categoriaService: CategoriaService
    ) {}

    @Get()
    @Render('produto/inicial')
    async inicial(): Promise<object> {
        const listaProdutos = await this.produtoService.findAll();

        return {
            titulo: 'Consulta de Produtos',
            produtos: listaProdutos,
            rotaAtual: '/produtos'
        }
    }

    @Get('criar')
    @Render('produto/formulario')
    async formulario(): Promise<object> {

        const marcas = await this.marcaService.findAll();
        const categorias = await this.categoriaService.findAll();

        return {
            titulo: 'Cadastro de Produtos',
            rotaAtual: '/produtos/criar',
            produto: {}, 
            marcas,
            categorias
       }
    }

    @Post('criar')
    @Redirect('/produtos')
    async criar(@Body() body: any) {
        console.log(body);
        await this.produtoService.create(body);
    }


    @Get(':id/editar')
    @Render('produto/formulario')
    async editar(@Param('id') id: string) {

    const produto = await this.produtoService.findOne(Number(id));
    const marcas = await this.marcaService.findAll();
    const categorias = await this.categoriaService.findAll();

    return {
        titulo: 'Editar Produto',
        produto,
        marcas,
        categorias,
        rotaAtual: '/produtos'
        };
    }

    @Post(':id/editar')
    @Redirect('/produtos')
    async atualizar(
    @Param('id') id: number,
    @Body() body: any
    ) {
    await this.produtoService.update(Number(id), body);
    }

   @Get(':id/excluir')
    @Render('produto/excluir')
    async excluir(@Param('id') id: string) {

        const produto = await this.produtoService.findOne(Number(id));

        return {
            titulo: 'Excluir Produto',
            produto,
            rotaAtual: '/produtos'
        };
    }

    @Post(':id/excluir')
    @Redirect('/produtos')
    async remover(@Param('id') id: string) {

        await this.produtoService.delete(Number(id));
    }
}
