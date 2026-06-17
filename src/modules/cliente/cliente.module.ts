import { Module } from "@nestjs/common";
import { ClienteController } from "./cliente.controller";
import { ClienteService } from "./cliente.service";
import { EnderecoModule } from "../endereco/endereco.module";

@Module({
    imports: [EnderecoModule],
    controllers: [ClienteController],
    providers: [ClienteService],
    exports: [ClienteService]
})
export class ClienteModule {}
