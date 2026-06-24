import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AutenticacaoService } from './autenticacao.service';

@Controller()
export class AutenticacaoController {
  constructor(private autenticacaoService: AutenticacaoService) {}

  @Get('login')
  @Render('autenticacao/login')
  login() {
    return { layout: false };
  }

  @Post('login')
  async autenticar(@Body() body: any, @Res() res: Response, @Req() req: any) {
    const funcionario = await this.autenticacaoService.login(
      body.email_fun,
      body.senha_fun,
    );

    if (!funcionario) {
      return res.render('autenticacao/login', {
        layout: false,
        erro: 'Credenciais inválidas',
      });
    }

    (req as any).session.funcionario = funcionario;

    return res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req: any, @Res() res: Response) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}