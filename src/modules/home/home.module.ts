import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { ProdutoService } from '../produto/produto.service';
import { PedidoService } from '../pedido/pedido.service';
import { ClienteService } from '../cliente/cliente.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';
import { Fornecedor } from '../fornecedor/fornecedor.entity';

@Module({
    controllers: [HomeController],
    providers: [ProdutoService, PedidoService, ClienteService, FornecedorService],
    exports: [ProdutoService, PedidoService, ClienteService, FornecedorService]
})
export class HomeModule {}