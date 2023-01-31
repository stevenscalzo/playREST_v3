import { Controller, Get, Param, Res, Req } from '@nestjs/common';
import { JuegoService } from 'src/juego/juego.service';

@Controller('buscar')
export class BuscarController {
  constructor(private readonly buscarService: JuegoService) {}

  // GET /buscar
  @Get('/')
  async listar(@Res() res, @Req() req) {
    const resultado = await this.buscarService.buscarPorTexto(
      req.param('search'),
    );
    if (resultado.length == 0) {
      return res.render('publico_index', {
        error: 'No se han encontrado juegos',
      });
    }
    return res.render('publico_index', { juegos: resultado });
  }
}
