import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";

@Controller('categorias')
export class categoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Get('criar')
    @Render('categoria/formulario')
    async formulario(): Promise<object> {

        return {
            titulo: 'Cadastro de categoria',
            rotaAtual: '/categorias/criar',
            categoria: {}
       }
    }

    @Post('criar')
    @Redirect('/categorias/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.categoriaService.create(body);
    }

}