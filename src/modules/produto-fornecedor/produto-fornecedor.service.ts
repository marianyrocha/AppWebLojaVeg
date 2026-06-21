import { Injectable } from "@nestjs/common";
import { ProdutoFornecedor } from "./produto-fornecedor.entity";

@Injectable()
export class ProdutoFornecedorService {

    async findAll(): Promise<ProdutoFornecedor[]> {
        return ProdutoFornecedor.find({
            relations: ['fornecedor', 'produto']
        });
    }

    async findOne(id: number): Promise<ProdutoFornecedor | null> {
        return ProdutoFornecedor.findOne({
            where: { id_pro_for: id },
            relations: ['fornecedor', 'produto']
        });
    }

    async create(dados: any): Promise<ProdutoFornecedor> {
        const produtoFornecedor = ProdutoFornecedor.create({
            quantidade_pro_for: Number(dados.quantidade_pro_for),
            preco_unitario_pro_for: Number(dados.preco_unitario_pro_for),
            fornecedor: { id_for: Number(dados.fornecedor.id_for) },
            produto: { id_pro: Number(dados.produto.id_pro) }
        });

        return await produtoFornecedor.save();
    }

    async update(id: number, dados: any) {
        await ProdutoFornecedor.update(
            { id_pro_for: id },
            {
                quantidade_pro_for: Number(dados.quantidade_pro_for),
                preco_unitario_pro_for: Number(dados.preco_unitario_pro_for),
                fornecedor: { id_for: Number(dados.fornecedor.id_for) },
                produto: { id_pro: Number(dados.produto.id_pro) }
            }
        );
    }

    async delete(id: number) {
        await ProdutoFornecedor.delete({ id_pro_for: id });
    }
}