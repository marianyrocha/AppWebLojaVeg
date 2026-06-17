import { Injectable } from "@nestjs/common";
import { Endereco } from "./endereco.entity";

@Injectable()
export class EnderecoService {     
    async findAll(): Promise<Endereco[]> {
        return Endereco.find();
    }

    async create(dados: any): Promise<Endereco> {
        const endereco = Endereco.create({
            rua_end: dados.rua_end,
            bairro_end: dados.bairro_end,
            numero_end: dados.numero_end,
            cidade_end: dados.cidade_end,
            estado_end: dados.estado_end,
            cep_end: dados.cep_end
        });

        return endereco.save();

    }
}