import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail,  IsDateString, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }
  return normalizedValue;
};

export class CreateFuncionarioDto {

    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
    nome_fun!: string;

    @IsNotEmpty({ message: 'O telefone é obrigatório' })
    @MinLength(8, { message: 'O telefone deve ter no mínimo 8 caracteres' })
    telefone_fun!: string;

    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({}, { message: 'Informe um e-mail válido' })
    email_fun!: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha_fun!: string;

    @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
    @IsDateString({}, { message: 'Informe uma data válida'})
    data_nascimento_fun!: Date;

    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @MinLength(11, {message: 'O CPF deve possuir no mínimo 11 caracteres' })
    cpf_fun!: string;

    @IsNotEmpty({ message: 'Selecione um cargo' })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    cargo_fun!: number;

    @IsNotEmpty({ message: 'O status do funcionário é obrigatório' })
    @MinLength(3, { message: 'O status deve possuir no mínimo 3 caracteres'})
    status_fun!: string;
        


}