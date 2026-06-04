import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { ProdutoService } from "./produto.service";

@Controller('produtos')
export class ProdutoController {

    constructor(private produtoService: ProdutoService) {}

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

        return {
            titulo: 'Cadastro de Produtos',
            rotaAtual: '/produtos/criar',
            produto: {}
       }
    }

    @Post('criar')
    @Redirect('/produtos')
    async criar(@Body() body: any) {
        console.log(body);
        await this.produtoService.create(body);
    }

}