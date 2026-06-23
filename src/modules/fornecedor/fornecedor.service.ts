import { Injectable } from "@nestjs/common";
import { Fornecedor } from "./fornecedor.entity";
import { CreateFornecedorDto } from "./dtos/create-fornecedor.dto";
import { Like } from "typeorm";
import { UpdateFornecedorDto } from "./dtos/update-fornecedor.dto";

@Injectable()
export class FornecedorService {     
    async findAll(): Promise<Fornecedor[]> {
        return Fornecedor.find();
    }

    async create(dados: CreateFornecedorDto): Promise<Fornecedor> {
        const fornecedor = Fornecedor.create({
            nome_for: dados.nome_for,
            email_for: dados.email_for,
            telefone_for: dados.telefone_for,
            razao_social_for: dados.razao_social_for, 
            cnpj_for: dados.cnpj_for
        });

        return fornecedor.save();

    }

    async buscar(termo: string): Promise<Fornecedor[]> {

    return Fornecedor.find({
        where: [
            {
                nome_for: Like(`%${termo}%`)
            },
            {
                email_for: Like(`%${termo}%`)
            },
            {
                telefone_for: Like(`%${termo}%`)
            }
        ],
    });


}
    async findOne(id: number): Promise<Fornecedor | null> {
        return Fornecedor.findOne({
            where: {
                id_for: id
            },
        });
    }
    
    async delete(id: number) {
        await Fornecedor.delete({
            id_for: id
        });
    }

    async update(id: number, dados: UpdateFornecedorDto) {
        await Fornecedor.update({ id_for: id }, {
            nome_for: dados.nome_for,
            email_for: dados.email_for,
            telefone_for: dados.telefone_for,
            razao_social_for: dados.razao_social_for, 
            cnpj_for: dados.cnpj_for
        });
    }
}