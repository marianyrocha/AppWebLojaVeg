import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaDto } from './create-marca.dto';

export class UpdateProdutoDto extends PartialType(CreateMarcaDto) {}