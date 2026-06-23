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

export class CreateEnderecoDto {

  @IsNotEmpty({ message: 'A rua é obrigatória' })
  @IsString()
  rua_end!: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @IsString()
  bairro_end!: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  numero_end!: number;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @IsString()
  cidade_end!: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @IsString()
  estado_end!: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  cep_end!: number;
}