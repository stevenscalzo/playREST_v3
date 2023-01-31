import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Req,
  UnauthorizedException,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto/login-dto.interface';

const usuarios = [
  { usuario: 'nacho', password: '12345' },
  { usuario: 'pepe', password: 'pepe111' },
];

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.usuario;
    const pass = body.password;
    const existe = usuarios.filter(
      (usuario) => usuario.usuario == usu && usuario.password == pass,
    );
    if (existe.length > 0) {
      req.session.usuario = existe[0].usuario;
      res.redirect('/juegos');
    } else {
      res.render('auth_login', {
        mensaje: 'Error usuario o contraseña incorrecta',
      });
    }
  }

  @Get('login')
  async listar(@Res() res) {
    return res.render('auth_login');
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
    res.redirect('/');
  }
}
