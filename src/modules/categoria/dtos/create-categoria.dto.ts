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

export class CreateCategoriaDto {

    @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
    @MinLength(3, {
        message: 'O nome da categoria deve possuir no mínimo 3 caracteres'
    })
    nome_cat!: string;

    @IsNotEmpty({ message: 'A descrição da categoria é obrigatória' })
    @MinLength(5, {
        message: 'A descrição deve possuir no mínimo 5 caracteres'
    })
    descricao_cat!: string;

    @IsNotEmpty({ message: 'O status da categoria é obrigatório' })
    @MinLength(3, {
        message: 'O status deve possuir no mínimo 3 caracteres'
    })
    status_cat!: string;
}