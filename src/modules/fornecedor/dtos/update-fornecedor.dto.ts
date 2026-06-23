import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedorDto } from './create-fornecedor.dto';

export class UpdateProdutoDto extends PartialType(CreateFornecedorDto) {}