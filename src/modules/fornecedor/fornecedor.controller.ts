import { Body, Param, Query, Controller, UseGuards, Get, Post, Redirect, Render } from "@nestjs/common";
import { FornecedorService } from "./fornecedor.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateFornecedorDto } from "./dtos/create-fornecedor.dto";

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
            fornecedor: {}
        };
    }

    @Get()
    @Render('fornecedor/inicial')
    async inicial(@Query('termo') termo?: string) {

        const fornecedores = termo
            ? await this.fornecedorService.buscar(termo)
            : await this.fornecedorService.findAll();

        return {
            titulo: 'Consulta de fornecedores',
            fornecedores,
            termo,
            rotaAtual: '/fornecedor'
        };
    }

    @Post('criar')
    @Redirect('/fornecedor')
    async criar(@Body() dados: CreateFornecedorDto) {
        await this.fornecedorService.create(dados);
    }

    @Get(':id/excluir')
    @Render('fornecedor/excluir')
    async excluir(@Param('id') id: string) {

        const fornecedor = await this.fornecedorService.findOne(Number(id));

        return {
            titulo: 'Excluir fornecedor',
            fornecedor,
            rotaAtual: '/fornecedor'
        };
    }

    @Post(':id/excluir')
    @Redirect('/fornecedor')
    async remover(@Param('id') id: string) {
        await this.fornecedorService.delete(Number(id));
    }

    @Get(':id/editar')
    @Render('fornecedor/formulario')
    async editar(@Param('id') id: string) {

        const fornecedor = await this.fornecedorService.findOne(Number(id));

        return {
            titulo: 'Editar fornecedor',
            rotaAtual: '/fornecedor/' + id + '/editar',
            fornecedor
        };
    }

    @Post(':id/editar')
    @Redirect('/fornecedor')
    async atualizar(
        @Param('id') id: string,
        @Body() dados: CreateFornecedorDto
    ) {
        await this.fornecedorService.update(Number(id), dados);
    }
}