import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.entity";
import { Marcas } from "../marca/marca.entity";
import { Categoria } from "../categoria/categoria.entity";


@Injectable()
export class ProdutoService {
    
    async findAll(): Promise<Produto[]> {
        return Produto.find({
            relations: ['marca', 'categoria']
        }); 
    }

    async create(dados: any): Promise<Produto> {
        const produto = Produto.create({ 
        nome_pro: dados.nome_pro,
        descricao_pro: dados.descricao_pro,
        preco_pro: dados.preco_pro,
        quantidade_pro: dados.quantidade_pro,
        status_pro: dados.status_pro,
        imagem_pro: dados.imagem_pro,

        marca: {
            id_mar: Number(dados.marca_pro)
        } as Marcas,

        categoria: {
            id_cat: Number(dados.categoria_pro)
        } as Categoria    
        });

        return produto.save();
    }

}

