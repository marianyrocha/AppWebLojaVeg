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

export class CreateCargoDto {

    @IsNotEmpty({ message: 'O nome do cargo é obrigatório' })
    @MinLength(3, {
        message: 'O nome do cargo deve possuir no mínimo 3 caracteres'
    })
    nome_car!: string;

    @IsNotEmpty({ message: 'A descrição do cargo é obrigatória' })
    @MinLength(5, {
        message: 'A descrição deve possuir no mínimo 5 caracteres'
    })
    descricao_car!: string;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'O salário deve possuir no máximo 2 casas decimais' }
    )
    @Transform(({ value }) => toDecimalNumber(value))
    @Min(0.01, {
        message: 'O salário deve ser maior que R$ 0,00'
    })
    salario_car!: number;
}