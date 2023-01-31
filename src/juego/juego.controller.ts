import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JuegoService } from './juego.service';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { EdicionDto } from './dto/edicion-dto/edicion-dto';
import { Edicion } from './interfaces/edicion/edicion.interface';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Helper } from 'src/utils/helper';

@Controller('juegos')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) { }

  @Get()
  async listar(@Res() res, @Session() session) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    const resultado = await this.juegoService.listar();
    return res.render('admin_juegos', { juegos: resultado });
  }

  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string, @Session() session) {
    if (id == 'nuevo') {
      if (!session.usuario)
        return res.render('auth_login', {
          mensaje: 'El usuario debe registrarse',
        });

      return res.render('admin_juegos_form');
    } else {
      const resultado = await this.juegoService.buscarPorId(id);

      if (resultado == null) {
        return res.render('publico_error', { error: 'Juego no encontrado' });
      }
      return res.render('publico_juego', { juego: resultado });
    }
  }

  @Get('editar/:id')
  async editarPorId(@Res() res, @Param('id') id: string, @Session() session) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    const resultado = await this.juegoService.buscarPorId(id);

    if (resultado == null) {
      return res.render('publico_error', { error: 'Juego no encontrado' });
    }
    return res.render('admin_juegos_form', { juego: resultado });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  async crear(
    @Res() res,
    @Body() crearJuegoDto: JuegoDto,
    @UploadedFile() file,
    @Session() session,
  ) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    if (file) {
      crearJuegoDto.imagen = file.filename;
    }
    await this.juegoService.insertar(crearJuegoDto);
    res.redirect('/juegos');
  }

  @Post('editar/:id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  async actualizar(
    @Res() res,
    @Param('id') id: string,
    @Body() actualizarJuegoDto: JuegoDto,
    @UploadedFile() file,
    @Session() session,
  ) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    if (file) {
      actualizarJuegoDto.imagen = file.filename;
    }
    await this.juegoService.actualizar(id, actualizarJuegoDto);
    res.redirect('/juegos');
  }

  @Post('borrar/:id')
  async borrar(@Res() res, @Param('id') id: string, @Session() session) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    await this.juegoService.borrar(id);
    res.redirect('/juegos');
  }

  @Get('editar/ediciones/:id')
  async editarEdiciones(
    @Res() res,
    @Param('id') id: string,
    @Session() session,
  ) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    const resultado = await this.juegoService.buscarPorId(id);

    if (resultado == null) {
      return res.render('publico_error', { error: 'Juego no encontrado' });
    }
    return res.render('admin_ediciones_form', { juego: resultado });
  }

  @Post('editar/ediciones/borrar/:idJuego/:idEdicion')
  async borrarEdicion(
    @Res() res,
    @Param('idJuego') idJuego: string,
    @Param('idEdicion') idEdicion: string,
    @Session() session,
  ) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    const resultado = await this.juegoService.buscarPorId(idJuego);
    const ediciones = resultado.Ediciones.filter(
      (value) => value.id != idEdicion,
    );
    resultado.Ediciones = ediciones;
    await this.juegoService.actualizar(idJuego, resultado);
    res.redirect('/juegos');
  }

  @Post('editar/ediciones/:id')
  async agregarEdiciones(
    @Res() res,
    @Param('id') id: string,
    @Session() session,
    @Body() agregarEdicionDto: EdicionDto,
  ) {
    if (!session.usuario)
      return res.render('auth_login', {
        mensaje: 'El usuario debe registrarse',
      });

    const resultado = await this.juegoService.buscarPorId(id);

    if (resultado == null) {
      return res.render('publico_error', { error: 'Juego no encontrado' });
    }

    const edicion: Edicion = {
      anyo: agregarEdicionDto.anyo,
      edicion: agregarEdicionDto.edicion,
      id: '',
    };
    resultado.Ediciones.push(edicion);
    //return res.render('publico_error', { error: JSON.stringify(resultado) });
    await this.juegoService.actualizar(id, resultado);
    res.redirect('/juegos');
  }
}
