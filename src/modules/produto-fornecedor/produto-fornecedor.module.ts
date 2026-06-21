import { Module } from "@nestjs/common";
import { ProdutoFornecedorController } from "./produto-fornecedor.controller";
import { ProdutoFornecedorService } from "./produto-fornecedor.service";
import { FornecedorModule } from "../fornecedor/fornecedor.module";
import { ProdutoModule } from "../produto/produto.module";
import { ProdutoService } from "../produto/produto.service";

@Module({
    imports: [FornecedorModule, ProdutoModule],
    controllers: [ProdutoFornecedorController],
    providers: [ProdutoFornecedorService],
    exports: [ProdutoFornecedorService]
})
export class ProdutoFornecedorModule {}