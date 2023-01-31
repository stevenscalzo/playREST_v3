import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto/login-dto.interface';

const usuarios = [
  { usuario: 'rosa', password: 'rosa', rol: 'admin' },
  { usuario: 'pepe', password: 'pepe111', rol: 'normal' },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: LoginDto) {
    const usuario = usuarios.find(
      (u) => u.usuario === user.usuario && u.password,
    );
    if (usuario) {
      const payload = { sub: usuario.usuario };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Usuario o password incorrecto',
      });
    }
  }
}
