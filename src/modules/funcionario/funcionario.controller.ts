import { Body, Query, Controller, UseGuards, Get, Post, Redirect, Render, Param } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { CargoService } from "../cargo/cargo.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateFuncionarioDto } from "./dtos/create-funcionario.dto";

@UseGuards(AutenticacaoGuard)
@Controller('funcionarios')
export class FuncionarioController {

    constructor(
        private funcionarioService: FuncionarioService,
        private cargoService: CargoService
    ) {}

    @Get('criar')
    @Render('funcionario/formulario')
    async formulario(): Promise<object> {

        const cargos = await this.cargoService.findAll();

        return {
            titulo: 'Cadastro de funcionario',
            rotaAtual: '/funcionarios/criar',
            funcionario: {},
            cargos
        };
    }

    @Get()
    @Render('funcionario/inicial')
    async inicial(@Query('termo') termo?: string) {

        const funcionarios = termo
            ? await this.funcionarioService.buscar(termo)
            : await this.funcionarioService.findAll();

        return {
            titulo: 'Consulta de funcionarios',
            funcionarios,
            termo,
            rotaAtual: '/funcionarios'
        };
    }

    @Post('criar')
    @Redirect('/funcionarios')
    async criar(@Body() dados: CreateFuncionarioDto) {
        await this.funcionarioService.create(dados);
    }

    @Get(':id/excluir')
    @Render('funcionario/excluir')
    async excluir(@Param('id') id: string) {

        const funcionario = await this.funcionarioService.findOne(Number(id));

        return {
            titulo: 'Excluir funcionario',
            funcionario,
            rotaAtual: '/funcionarios'
        };
    }

    @Post(':id/excluir')
    @Redirect('/funcionarios')
    async remover(@Param('id') id: string) {
        await this.funcionarioService.delete(Number(id));
    }

    @Get(':id/editar')
    @Render('funcionario/formulario')
    async editar(@Param('id') id: string) {

        const funcionario = await this.funcionarioService.findOne(Number(id));
        const cargos = await this.cargoService.findAll();

        return {
            titulo: 'Editar funcionario',
            rotaAtual: `/funcionarios/${id}/editar`,
            funcionario,
            cargos
        };
    }

    @Post(':id/editar')
    @Redirect('/funcionarios')
    async atualizar(
        @Param('id') id: string,
        @Body() dados: CreateFuncionarioDto
    ) {
        await this.funcionarioService.update(Number(id), dados);
    }
}