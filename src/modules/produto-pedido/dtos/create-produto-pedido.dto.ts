import { Transform } from "class-transformer";
import { IsNotEmpty, IsDecimal, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }
  return normalizedValue;
};

export class CreateProdutoPedidoDto {

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantidade_pro_ped!: number;

  @IsNotEmpty({ message: 'O preço unitário é obrigatório' })
  @IsDecimal({ decimal_digits: '2' }, { message: 'O valor deve ter 2 casas decimais' })
  @Transform(({ value }) => parseFloat(value))
  preco_unitario_pro_ped!: number;

  @IsNotEmpty({ message: 'O ID do pedido é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pedido_ped!: number;

  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  produto_pro!: number;
}