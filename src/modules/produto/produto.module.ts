import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoService } from "./produto.service";
import { MarcaModule } from "../marca/marca.module";
import { CategoriaModule } from "../categoria/categoria.module";


@Module({
    imports: [MarcaModule, CategoriaModule],
    controllers: [ProdutoController],
    providers: [ProdutoService],

})
export class ProdutoModule {}