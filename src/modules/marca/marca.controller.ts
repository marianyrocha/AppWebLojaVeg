import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { MarcaService } from "./marca.service";

@Controller('marca')
export class MarcaController {

    constructor(private marcaService: MarcaService) {}

    @Get()
    @Render('marca/inicial')
    async inicial(): Promise<object> {
        const marca = await this.marcaService.findAll();

        return {
            titulo: 'Consulta de Marcas',
            marca
        }
    }
}