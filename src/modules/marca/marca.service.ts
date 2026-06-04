import { Injectable } from "@nestjs/common";
import { Marca } from "./marca.entity";

@Injectable()
export class MarcaService {     
    async findAll(): Promise<Marca[]> {
        return Marca.find();
    }
}