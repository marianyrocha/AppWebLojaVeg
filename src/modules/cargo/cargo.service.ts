import { Injectable } from "@nestjs/common";
import { Cargo } from "./cargo.entity";

@Injectable()
export class CargoService {     
    async findAll(): Promise<Cargo[]> {
        return Cargo.find();
    }

    async create(dados: any): Promise<Cargo> {
        const cargo = Cargo.create({
            nome_car: dados.nome_car,
            descricao_car: dados.descricao_car,
            salario_car: dados.salario_car
        });

        return cargo.save();

    }
}