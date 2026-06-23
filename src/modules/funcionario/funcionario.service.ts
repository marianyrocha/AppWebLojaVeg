import { Injectable } from "@nestjs/common";
import { Funcionario } from "./funcionario.entity";
import { Cargo } from "../cargo/cargo.entity";
import { CreateFuncionarioDto } from "./dtos/create-funcionario.dto";
import { Like } from "typeorm";
import { UpdaFuncionarioDto } from "./dtos/update-funcionario.dto";

@Injectable()
export class FuncionarioService {     
    async findAll(): Promise<Funcionario[]> {
        return Funcionario.find();
    }

    async create(dados: CreateFuncionarioDto): Promise<Funcionario> {
        const funcionario = Funcionario.create({
            nome_fun: dados.nome_fun,
            email_fun: dados.email_fun,
            senha_fun: dados.senha_fun,
            cpf_fun: dados.cpf_fun,
            telefone_fun: dados.telefone_fun,
            data_nascimento_fun: dados.data_nascimento_fun,
            status_fun: dados.status_fun,

            cargo: {
                id_car: Number(dados.fk_cargo_id_car)
            } as Cargo
            
        });

        return funcionario.save();

    }

    async buscar(termo: string): Promise<Funcionario[]> {

    return Funcionario.find({
        where: [
            {
                nome_fun: Like(`%${termo}%`)
            },
            {
                email_fun: Like(`%${termo}%`)
            },
            {
                telefone_fun: Like(`%${termo}%`)
            }
        ],
    });
    }
    async findOne(id: number): Promise<Funcionario | null> {
        return Funcionario.findOne({
            where: {
                id_fun: id
            },
            relations: ['cargo']
        });
    }
    
    async delete(id: number) {
        await Funcionario.delete({
            id_fun: id
        });
    }

    async update(id: number, dados: UpdaFuncionarioDto) {
        await Funcionario.update({ id_fun: id }, {
            nome_fun: dados.nome_fun,
            email_fun: dados.email_fun,
            senha_fun: dados.senha_fun,
            cpf_fun: dados.cpf_fun,
            telefone_fun: dados.telefone_fun,
            data_nascimento_fun: dados.data_nascimento_fun,
            status_fun: dados.status_fun,

            cargo: {
                id_car: Number(dados.fk_cargo_id_car)
            } as Cargo
        });
    }
}