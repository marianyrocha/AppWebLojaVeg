import { Module } from "@nestjs/common";
import { FuncionarioController } from "./funcionario.controller";
import { FuncionarioService } from "./funcionario.service";
import { CargoService } from "../cargo/cargo.service";
import { CargoModule } from "../cargo/cargo.module";

@Module({
    imports: [CargoModule],
    controllers: [FuncionarioController],
    providers: [FuncionarioService],
    exports: [FuncionarioService]
})
export class FuncionarioModule {}
