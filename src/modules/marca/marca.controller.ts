import { Body,Controller, UseGuards, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { MarcaService } from "./marca.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateMarcaDto } from "./dtos/create-marca.dto";

@UseGuards(AutenticacaoGuard)
@Controller('marcas')
export class MarcaController {

    constructor(private marcaService: MarcaService) {}

    @Get('criar')
    @Render('marca/formulario')
    async formulario(): Promise<object> {
        return {
            titulo: 'Cadastro de Marcas',
            rotaAtual: '/marcas/criar',
            marcas: {}
       }
    }

    @Post('criar')
    @Redirect('/marcas/criar')
        async criar(@Body() dados: CreateMarcaDto) { 
        await this.marcaService.create(dados);
    }

}