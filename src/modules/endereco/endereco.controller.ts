import { Body, Controller, Get, UseGuards, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { EnderecoService } from "./endereco.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateEnderecoDto } from "./dtos/create-endereco.dto";

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
    @Redirect('/enderecos/criar')
        async criar(@Body() dados: CreateEnderecoDto) { 
        await this.enderecoService.create(dados);
    }

}