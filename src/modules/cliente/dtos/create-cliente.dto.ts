import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail, IsDateString, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }
  return normalizedValue;
};

export class CreateClienteDto {

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome_cli!: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString()
  telefone_cli!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email_cli!: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Formato de data inválido' })
  data_nascimento_cli!: Date;

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  endereco_cli!: number;
}