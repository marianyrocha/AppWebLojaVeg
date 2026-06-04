import { Module } from "@nestjs/common";
import { MarcaController } from "./marca.controller";
import { MarcaService } from "./marca.service";

@Module({
    imports: [],
    controllers: [MarcaController],
    providers: [MarcaService],
    exports: []
})
export class MarcaModule {}
