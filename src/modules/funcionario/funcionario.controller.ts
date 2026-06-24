import { Body, Req, Res, Query, Controller, UseGuards, Get, Post, Redirect, Param } from "@nestjs/common";
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
    async formulario(@Req() req, @Res() res) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        const cargos = await this.cargoService.findAll();

        return res.render('funcionario/formulario', {
            titulo: 'Cadastro de funcionario',
            rotaAtual: '/funcionarios/criar',
            funcionario: {},
            cargos
        });
    }

    @Get()
    async inicial(@Req() req, @Res() res, @Query('termo') termo?: string) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        const funcionarios = termo
            ? await this.funcionarioService.buscar(termo)
            : await this.funcionarioService.findAll();

        return res.render('funcionario/inicial', {
            titulo: 'Consulta de funcionarios',
            funcionarios,
            termo,
            rotaAtual: '/funcionarios'
        });
    }

    @Post('criar')
    async criar(@Req() req, @Res() res, @Body() dados: CreateFuncionarioDto) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        await this.funcionarioService.create(dados);
        return res.redirect('/funcionarios');
    }

    @Get(':id/editar')
    async editar(@Req() req, @Res() res, @Param('id') id: string) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        const funcionario = await this.funcionarioService.findOne(Number(id));
        const cargos = await this.cargoService.findAll();

        return res.render('funcionario/formulario', {
            titulo: 'Editar funcionario',
            rotaAtual: `/funcionarios/${id}/editar`,
            funcionario,
            cargos
        });
    }

    @Post(':id/editar')
    async atualizar(@Req() req, @Res() res, @Param('id') id: string, @Body() dados: CreateFuncionarioDto) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        await this.funcionarioService.update(Number(id), dados);
        return res.redirect('/funcionarios');
    }

    @Get(':id/excluir')
    async excluir(@Req() req, @Res() res, @Param('id') id: string) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        const funcionario = await this.funcionarioService.findOne(Number(id));

        return res.render('funcionario/excluir', {
            titulo: 'Excluir funcionario',
            funcionario,
            rotaAtual: '/funcionarios'
        });
    }

    @Post(':id/excluir')
    async remover(@Req() req, @Res() res, @Param('id') id: string) {
        const user = req.session?.funcionario;

        if (!user || user.cargo?.id_car !== 2) {
            return res.redirect('/');
        }

        await this.funcionarioService.delete(Number(id));
        return res.redirect('/funcionarios');
    }
}