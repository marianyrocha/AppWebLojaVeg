import { Transform } from "class-transformer";
import { IsNotEmpty, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }
  return normalizedValue;
};

export class CreateProdutoDto {

    @IsNotEmpty({ message: 'O campo nome é obrigatório'})
    @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
    nome_pro!: string;

    @IsNotEmpty({message: 'O status do pedido é obrigatório'})
    @MinLength(3, {
    message: 'O status deve possuir no mínimo 3 caracteres'})
    status_pro!: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ter no máximo 2 casas decimais' })
    @Transform(({ value }) => toDecimalNumber(value))
    @Min(0.01, { message: 'O preço deve no mínimo R$ 0,01'})
    preco_pro!: number;

    @IsNotEmpty({ message: 'A quantidade é obrigatória' })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    @Min(0, { message: 'A quantidade não pode ser negativa' })
    quantidade_pro!: number;
        
    @IsNotEmpty({message: 'Selecione uma marca' })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    marca!: number;

    @IsNotEmpty({message: 'Selecione uma categoria' })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    categoria!: number;

    @IsOptional()
    @IsString()
    descricao_pro?: string;

    @IsOptional()
    @IsString()
    imagem_pro?: string;


}