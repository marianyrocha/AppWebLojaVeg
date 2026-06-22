import { Body, Controller, Get, UseGuards, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { EnderecoService } from "./endereco.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

@UseGuards(AutenticacaoGuard)
@Controller('enderecos')
export class EnderecoController {

    constructor(private enderecoService: EnderecoService) {}

    @Get('criar')
    @Render('endereco/formulario')
    async formulario(): Promise<object> {

        return {
            titulo: 'Cadastro de endereco',
            rotaAtual: '/enderecos/criar',
            endereco: {}
       }
    }

    @Post('criar')
    @Redirect('/clientes/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.enderecoService.create(body);
    }

}