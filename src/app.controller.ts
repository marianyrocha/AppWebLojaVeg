import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('sobre')
  @Render('_sobre')
  getSobre(): object {
    return {
      titulo: 'Seção de informações do sistema web.',
      rotaAtual: '/sobre'
    };
  }

  @Get('login')
  @Render('autenticacao/login')
  login(): object {
    return {
      layout: false,
      rotaAtual: '/login'
    };
  }

  @Get('registro')
  @Render('registro')
  registro() {
  return {
    titulo: 'Página de registro',
    rotaAtual: '/registro'
  };
  }
}
