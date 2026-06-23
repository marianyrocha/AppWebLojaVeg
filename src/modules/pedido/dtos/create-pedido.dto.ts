import { Transform } from "class-transformer";
import { IsNotEmpty, IsDecimal, IsEmail,  IsDateString, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }
  return normalizedValue;
};

export class CreatePedidoDto {

  @IsNotEmpty({ message: 'A data é obrigatória' })
  @IsDateString({}, { message: 'Formato de data inválido' })
  data_ped!: Date;

  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsString()
  status_ped!: string;

  @IsNotEmpty({ message: 'O valor é obrigatório' })
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => parseFloat(value))
  valor_ped!: number;

  @IsNotEmpty({ message: 'A forma de pagamento é obrigatória' })
  @IsString()
  forma_pagamento_ped!: string;

  @IsOptional()
  @IsString()
  canal_ped?: string;

  @IsNotEmpty({ message: 'O cliente é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  cliente_ped!: number;

  @IsNotEmpty({ message: 'O funcionário é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  funcionario_ped!: number;
}