import { Injectable } from "@nestjs/common";
import { Marcas } from "./marca.entity";
import { CreateMarcaDto } from "./dtos/create-marca.dto";

@Injectable()
export class MarcaService {     
    async findAll(): Promise<Marcas[]> {
        return Marcas.find();
    }

    async create(dados: CreateMarcaDto): Promise<Marcas> {
        const marcas = Marcas.create({
            nome_mar: dados.nome_mar,
            contato_mar: dados.contato_mar
        });

        return marcas.save();

    }

}