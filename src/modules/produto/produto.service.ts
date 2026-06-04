import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.entity";

@Injectable()
export class ProdutoService {
    
    async findAll(): Promise<Produto[]> {
        return Produto.find();
    }

    async create(dados: any): Promise<Produto> {
        const produto = Produto.create({ ...dados, fornecedor: { id: dados.fornecedor } });

        return produto.save();
    }

}

