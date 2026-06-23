import { Body, Controller, Query, UseGuards, Get, Post, Redirect, Render, Param } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { EnderecoService } from "../endereco/endereco.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateClienteDto } from "./dtos/create-cliente.dto";

@UseGuards(AutenticacaoGuard)
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
            cliente: {},
            enderecos
        };
    }

    @Get()
    @Render('cliente/inicial')
    async inicial(@Query('termo') termo?: string) {

        const clientes = termo
            ? await this.clienteService.buscar(termo)
            : await this.clienteService.findAll();

        return {
            titulo: 'Consulta de clientes',
            clientes,
            termo,
            rotaAtual: '/clientes'
        };
    }

    @Post('criar')
    @Redirect('/clientes')
    async criar(@Body() dados: CreateClienteDto) {
        await this.clienteService.create(dados);
    }

    @Get(':id/excluir')
    @Render('cliente/excluir')
    async excluir(@Param('id') id: string) {

        const cliente = await this.clienteService.findOne(Number(id));

        return {
            titulo: 'Excluir cliente',
            cliente,
            rotaAtual: '/clientes'
        };
    }

    @Post(':id/excluir')
    @Redirect('/clientes')
    async remover(@Param('id') id: string) {
        await this.clienteService.delete(Number(id));
    }

    @Get(':id/editar')
    @Render('cliente/formulario')
    async editar(@Param('id') id: string) {

        const cliente = await this.clienteService.findOne(Number(id));
        const enderecos = await this.enderecoService.findAll();

        return {
            titulo: 'Editar cliente',
            rotaAtual: `/clientes/${id}/editar`,
            cliente,
            enderecos
        };
    }

    @Post(':id/editar')
    @Redirect('/clientes')
    async atualizar(
        @Param('id') id: string,
        @Body() dados: CreateClienteDto
    ) {
        await this.clienteService.update(Number(id), dados);
    }
}