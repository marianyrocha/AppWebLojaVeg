import { Body, Controller, UseGuards, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { CargoService } from "./cargo.service";
import { AutenticacaoGuard } from "../autenticacao/autenticacao.guard";
import { CreateCargoDto } from "./dtos/create-cargo.dto";

@UseGuards(AutenticacaoGuard)
@Controller('cargos')
export class CargoController {

    constructor(private cargoService: CargoService) {}

    @Get('criar')
    @Render('cargo/formulario')
    async formulario(): Promise<object> {

        return {
            titulo: 'Cadastro de cargo',
            rotaAtual: '/cargos/criar',
            cargo: {}
       }
    }

    @Post('criar')
    @Redirect('/cargos/criar')
        async criar(@Body() dados: CreateCargoDto) { 
        await this.cargoService.create(dados);
    }
}