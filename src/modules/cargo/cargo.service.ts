import { Injectable } from "@nestjs/common";
import { Cargo } from "./cargo.entity";
import { CreateCargoDto } from "./dtos/create-cargo.dto";
import { Funcionario } from "../funcionario/funcionario.entity";

    @Injectable()
    export class CargoService {     
        async findAll(): Promise<Cargo[]> {
        return Cargo.find();
    }

    async create(dados: CreateCargoDto): Promise<Cargo> {
        const cargo = Cargo.create({
            nome_car: dados.nome_car,
            descricao_car: dados.descricao_car,
            salario_car: dados.salario_car
        });

        return cargo.save();
    }

    async validarFuncionario(email: string, senha: string) {
    return await Funcionario.findOne({
        where: { email_fun: email, senha_fun: senha },
        relations: ['cargo'] 
    });

}
}