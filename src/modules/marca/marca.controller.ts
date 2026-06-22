import { Body,Controller, UseGuards, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { MarcaService } from "./marca.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

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
    async criar(@Body() body: any) {
        console.log(body);
        await this.marcaService.create(body);
    }

}