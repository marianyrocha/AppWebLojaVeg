import { Injectable } from '@nestjs/common';
import { Funcionario } from '../funcionario/funcionario.entity';

@Injectable()
export class AutenticacaoService {

    async login(email: string, senha: string) {

        return await Funcionario.findOne({
            where: {
                email_fun: email,
                senha_fun: senha
            },
            relations: ['cargo']
        });
    }
}