import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail, IsDateString, IsString, IsNumber } from "class-validator";

export class CreateClienteDto {

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome_cli!: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString()
  telefone_cli!: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email_cli!: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Formato de data inválido' })
  data_nascimento_cli!: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Endereço inválido' })
  fk_endereco_id_end!: number;
}