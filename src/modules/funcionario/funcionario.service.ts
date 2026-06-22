import { Injectable } from "@nestjs/common";
import { Funcionario } from "./funcionario.entity";
import { Cargo } from "../cargo/cargo.entity";

@Injectable()
export class FuncionarioService {     
    async findAll(): Promise<Funcionario[]> {
        return Funcionario.find();
    }

    async create(dados: any): Promise<Funcionario> {
        const funcionario = Funcionario.create({
            nome_fun: dados.nome_fun,
            email_fun: dados.email_fun,
            senha_fun: dados.senha_fun,
            cpf_fun: dados.cpf_fun,
            telefone_fun: dados.telefone_fun,
            data_nascimento_fun: dados.data_nascimento_fun,
            status_fun: dados.status_fun,

            cargo: {
                id_car: Number(dados.cargo_fun)
            } as Cargo
            
        });

        return funcionario.save();

    }
}