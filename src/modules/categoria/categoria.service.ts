import { Injectable } from "@nestjs/common";
import { Categoria } from "./categoria.entity";
import { CreateCategoriaDto } from "./dtos/create-categoria.dto";

@Injectable()
export class CategoriaService {     
    async findAll(): Promise<Categoria[]> {
        return Categoria.find();
    }

    async create(dados: CreateCategoriaDto): Promise<Categoria> {
        const categoria = Categoria.create({
            nome_cat: dados.nome_cat,
            descricao_cat: dados.descricao_cat,
            status_cat: dados.status_cat
        });

        return categoria.save();

    }
}