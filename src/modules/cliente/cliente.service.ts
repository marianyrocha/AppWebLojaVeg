import { Injectable } from "@nestjs/common";
import { Clientes } from "./cliente.entity";
import { Endereco } from "../endereco/endereco.entity";
import { CreateEnderecoDto } from "../endereco/dtos/create-endereco.dto";
import { CreateClienteDto } from "./dtos/create-cliente.dto";
import { Like } from 'typeorm';
import { UpdateClienteDto } from "./dtos/update-cliente.dto";

@Injectable()
export class ClienteService {     
    async findAll(): Promise<Clientes[]> {
        return Clientes.find();
    }

    async create(dados: CreateClienteDto): Promise<Clientes> {
        const clientes = Clientes.create({
            nome_cli: dados.nome_cli,
            telefone_cli: dados.telefone_cli,
            email_cli: dados.email_cli,
            data_nascimento_cli: dados.data_nascimento_cli,
            
            endereco: {
                id_end: Number(dados.fk_endereco_id_end)
            } as Endereco

            
        });

        return clientes.save();

    }


    async buscar(termo: string): Promise<Clientes[]> {

    return Clientes.find({
        where: [
            {
                nome_cli: Like(`%${termo}%`)
            },
            {
                email_cli: Like(`%${termo}%`)
            },
            {
                telefone_cli: Like(`%${termo}%`)
            }
        ],
        relations: ['endereco']
    });

    }

    async findOne(id: number): Promise<Clientes | null> {
        return Clientes.findOne({
            where: {
                id_cli: id
            },
            relations: ['endereco']
        });
    }
    
    async delete(id: number) {
        await Clientes.delete({
            id_cli: id
        });
    }

    async update(id: number, dados: UpdateClienteDto) {
        await Clientes.update({ id_cli: id }, {
            nome_cli: dados.nome_cli,
            telefone_cli: dados.telefone_cli,
            email_cli: dados.email_cli,
            data_nascimento_cli: dados.data_nascimento_cli,
            
            endereco: {
                id_end: Number(dados.fk_endereco_id_end)
            } as Endereco
        });
    }

}