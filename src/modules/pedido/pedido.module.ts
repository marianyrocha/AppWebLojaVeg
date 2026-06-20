import { Module } from "@nestjs/common";
import { PedidoController } from "./pedido.controller";
import { PedidoService } from "./pedido.service";
import { ClienteModule } from "../cliente/cliente.module";
import { FuncionarioModule } from "../funcionario/funcionario.module";

@Module({
    imports: [ClienteModule, FuncionarioModule],
    controllers: [PedidoController],
    providers: [PedidoService],
    exports: [PedidoService]
})
export class PedidoModule {}