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

export class CreateMarcaDto {

  @IsNotEmpty({ message: 'O nome da marca é obrigatório' })
  @IsString()
  nome_mar!: string;

  @IsNotEmpty({ message: 'O contato é obrigatório' })
  @IsString()
  contato_mar!: string;
}