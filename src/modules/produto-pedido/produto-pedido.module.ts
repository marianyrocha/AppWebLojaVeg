import { Module } from "@nestjs/common";
import { ProdutoPedidoController } from "./produto-pedido.controller";
import { ProdutoPedidoService } from "./produto-pedido.service";
import { PedidoModule } from "../pedido/pedido.module";
import { ProdutoModule } from "../produto/produto.module";
import { ProdutoService } from "../produto/produto.service";

@Module({
    imports: [PedidoModule, ProdutoModule],
    controllers: [ProdutoPedidoController],
    providers: [ProdutoPedidoService],
    exports: [ProdutoPedidoService]
})
export class ProdutoPedidoModule {}