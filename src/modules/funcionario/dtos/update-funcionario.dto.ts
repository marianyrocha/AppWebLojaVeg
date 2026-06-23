import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from './create-funcionario.dto';

export class UpdateProdutoDto extends PartialType(CreateFuncionarioDto) {}