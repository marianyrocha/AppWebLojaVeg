import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { MarcaService } from "../marca/marca.service";
import { CategoriaService } from "../categoria/categoria.service";

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

}