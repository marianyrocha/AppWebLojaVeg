import { Body, Controller, UseGuards, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { FornecedorService } from "./fornecedor.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";

@UseGuards(AutenticacaoGuard)
@Controller('fornecedor')
export class FornecedorController {

    constructor(private fornecedorService: FornecedorService) {}

    @Get('criar')
    @Render('fornecedor/formulario')
    async formulario(): Promise<object> {

        return {
            titulo: 'Cadastro de fornecedor',
            rotaAtual: '/fornecedor/criar',
            fornecedor: []
       }
    }
f
    @Post('criar')
    @Redirect('/produto-fornecedor/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.fornecedorService.create(body);
    }

}