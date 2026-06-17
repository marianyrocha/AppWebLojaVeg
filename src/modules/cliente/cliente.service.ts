import { Injectable } from "@nestjs/common";
import { Clientes } from "./cliente.entity";
import { Endereco } from "../endereco/endereco.entity";

@Injectable()
export class ClienteService {     
    async findAll(): Promise<Clientes[]> {
        return Clientes.find();
    }

    async create(dados: any): Promise<Clientes> {
        const clientes = Clientes.create({
            nome_cli: dados.nome_cli,
            telefone_cli: dados.telefone_cli,
            email_cli: dados.email_cli,
            data_nascimento_cli: dados.data_nascimento_cli,
            
            endereco: {
                id_end: Number(dados.endereco_cli)
            } as Endereco

            
        });

        return clientes.save();

    }

}