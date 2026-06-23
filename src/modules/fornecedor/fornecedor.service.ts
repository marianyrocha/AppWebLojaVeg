import { Injectable } from "@nestjs/common";
import { Fornecedor } from "./fornecedor.entity";
import { CreateFornecedorDto } from "./dtos/create-fornecedor.dto";

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
}