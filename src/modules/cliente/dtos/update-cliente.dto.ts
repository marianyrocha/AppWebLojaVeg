import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateProdutoDto extends PartialType(CreateClienteDto) {}