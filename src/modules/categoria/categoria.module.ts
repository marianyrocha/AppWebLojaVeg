import { Module } from "@nestjs/common";
import { categoriaController } from "./categoria.controller";
import { CategoriaService } from "./categoria.service";

@Module({
    imports: [],
    controllers: [categoriaController],
    providers: [CategoriaService],
    exports: [CategoriaService]
})
export class CategoriaModule {}
