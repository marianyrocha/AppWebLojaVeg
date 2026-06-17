import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { CargoService } from "../cargo/cargo.service";

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
       }
    }

    @Post('criar')
    @Redirect('/funcionarios/criar')
    async criar(@Body() body: any) {
        console.log(body);
        await this.funcionarioService.create(body);
    }

}