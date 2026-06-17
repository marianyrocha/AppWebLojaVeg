import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { EnderecoService } from "./endereco.service";

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
    async criar(@Body() body: any) {
        console.log(body);
        await this.enderecoService.create(body);
    }

}