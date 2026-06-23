import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProdutoPedidoDto {

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  quantidade_pro_ped!: number;

  @IsNotEmpty({ message: 'O preço unitário é obrigatório' })
  @Transform(({ value }) => Number(String(value).replace(',', '.')))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor deve ter no máximo 2 casas decimais' }
  )
  preco_unitario_pro_ped!: number;

  @IsNotEmpty({ message: 'O ID do pedido é obrigatório' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pedido_id!: number;

  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  produto_id!: number;
}