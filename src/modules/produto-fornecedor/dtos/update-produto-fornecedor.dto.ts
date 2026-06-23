import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoFornecedorDto } from './create-produto-fornecedor.dto';

export class UpdateProdutoDtoFornecedorDto extends PartialType(CreateProdutoFornecedorDto) {}