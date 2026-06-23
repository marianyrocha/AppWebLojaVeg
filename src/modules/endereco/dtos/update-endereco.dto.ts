import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateProdutoDto extends PartialType(CreateEnderecoDto) {}