import { Body, Controller, UseGuards, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateCategoriaDto } from "./dtos/create-categoria.dto";

@UseGuards(AutenticacaoGuard)
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
        async criar(@Body() dados: CreateCategoriaDto) { 
        await this.categoriaService.create(dados);
    }

}