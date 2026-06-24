import { Body, Req, Res, Controller, UseGuards, Get, Post, Redirect } from "@nestjs/common";
import { CargoService } from "./cargo.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateCargoDto } from "./dtos/create-cargo.dto";

@UseGuards(AutenticacaoGuard)
@Controller('cargos')
export class CargoController {

    constructor(private cargoService: CargoService) {}

    private isGerente(req: any) {
        return req.session?.funcionario?.cargo?.id_car === 2;
    }

    @Get()
    async listar(@Req() req, @Res() res) {
        if (!this.isGerente(req)) {
            return res.redirect('/');
        }

        const cargos = await this.cargoService.findAll();

        return res.render('cargo/lista', {
            titulo: 'Cargos',
            rotaAtual: '/cargos',
            cargos,
            funcionario: req.session.funcionario
        });
    }

    @Get('criar')
    async formulario(@Req() req, @Res() res) {
        if (!this.isGerente(req)) {
            return res.redirect('/');
        }

        return res.render('cargo/formulario', {
            titulo: 'Cadastro de cargo',
            rotaAtual: '/cargos/criar',
            cargo: {},
            funcionario: req.session.funcionario
        });
    }

    @Post('criar')
    async criar(@Req() req, @Res() res, @Body() dados: CreateCargoDto) {
        if (!this.isGerente(req)) {
            return res.redirect('/');
        }

        await this.cargoService.create(dados);
        return res.redirect('/cargos');
    }
}