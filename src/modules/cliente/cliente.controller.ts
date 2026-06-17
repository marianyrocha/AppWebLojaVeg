import { Body,Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { EnderecoService } from "../endereco/endereco.service";

@Controller('clientes')
export class ClienteController {

    constructor(
            private clienteService: ClienteService,
            private enderecoService: EnderecoService
    ) {}    

    @Get('criar')
    @Render('cliente/formulario')
    async formulario(): Promise<object> {

        const enderecos = await this.enderecoService.findAll();

        return {
            titulo: 'Cadastro de clientes',
            rotaAtual: '/clientes/criar',
            clientes: {},
            enderecos
       }
    }

    @Post('criar')
    @Redirect('/clientes/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.clienteService.create(body);
    }

}