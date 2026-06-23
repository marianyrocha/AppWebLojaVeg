import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";
import { Produto } from "./produto.entity";
import { Marcas } from "../marca/marca.entity";
import { Categoria } from "../categoria/categoria.entity";
import { UpdateProdutoDto } from "./dtos/update-produto.dto";

@Injectable()
export class ProdutoService {

    async findAll(): Promise<Produto[]> {
        return Produto.find({
            relations: ['marca', 'categoria']
        });
    }

    async buscar(termo: string): Promise<Produto[]> {
        return Produto.find({
            where: {
                nome_pro: Like(`%${termo}%`)
            },
            relations: ['marca', 'categoria']
        });
    }

    async findOne(id: number): Promise<Produto | null> {
        return Produto.findOne({
            where: {
                id_pro: id
            },
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

    async update(id: number, dados: UpdateProdutoDto) {
        await Produto.update({ id_pro: id }, {
            nome_pro: dados.nome_pro,
            descricao_pro: dados.descricao_pro,
            preco_pro: dados.preco_pro,
            quantidade_pro: dados.quantidade_pro,
            status_pro: dados.status_pro,
            imagem_pro: dados.imagem_pro
        });
    }

    async delete(id: number) {
        await Produto.delete({
            id_pro: id
        });
    }
}