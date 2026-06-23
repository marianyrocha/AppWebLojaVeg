import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoPedidoDto } from './create-produto-pedido.dto';

export class UpdateProdutoPedidoDto extends PartialType(CreateProdutoPedidoDto) {}