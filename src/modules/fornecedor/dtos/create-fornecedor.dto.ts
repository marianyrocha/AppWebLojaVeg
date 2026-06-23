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

export class CreateFornecedorDto {

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome_for!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email_for!: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString()
  telefone_for!: string;

  @IsNotEmpty({ message: 'A razão social é obrigatória' })
  @IsString()
  razao_social_for!: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @IsString()
  cnpj_for!: string;
}