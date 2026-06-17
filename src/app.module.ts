import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { MarcaModule } from './modules/marca/marca.module';
import { Fornecedor } from './modules/fornecedor/fornecedor.entity';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { EnderecoModule } from './modules/endereco/endereco.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProdutoModule,
    MarcaModule,
    CategoriaModule,
    FornecedorModule,
    PedidoModule, 
    FuncionarioModule, 
    ClienteModule, 
    CargoModule, 
    EnderecoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
