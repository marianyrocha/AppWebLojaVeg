import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";

@Controller('categoria')
export class categoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Get()
    @Render('categoria/inicial')
    async inicial(): Promise<object> {
        const categoria = await this.categoriaService.findAll();

        return {
            titulo: 'Consulta de Categorias',
            categoria
        }
    }
}