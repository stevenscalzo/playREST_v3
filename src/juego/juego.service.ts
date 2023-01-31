import { Injectable } from '@nestjs/common';
import { Juego } from './interfaces/juego/juego.interface';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find().exec();
  }

  async buscarPorTexto(texto: string): Promise<Juego[]> {
    const juegos = await this.juegoModel.find().exec();
    return juegos.filter((x) => x.nombre.includes(texto));
  }

  async insertar(crearJuegoDto: JuegoDto): Promise<Juego> {
    const nuevoJuego = new this.juegoModel(crearJuegoDto);
    return await nuevoJuego.save();
  }

  async buscarPorId(id: string): Promise<Juego> {
    try {
      return await this.juegoModel.findById(id).exec();
    } catch (e) {
      return null;
    }
  }

  async borrar(id: string): Promise<Juego> {
    return await this.juegoModel.findByIdAndRemove(id).exec();
  }

  async actualizar(id: string, actualizarJuegoDto: JuegoDto): Promise<Juego> {
    return await this.juegoModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nombre: actualizarJuegoDto.nombre,
            descripcion: actualizarJuegoDto.descripcion,
            edad: actualizarJuegoDto.edad,
            jugadores: actualizarJuegoDto.jugadores,
            tipo: actualizarJuegoDto.tipo,
            precio: actualizarJuegoDto.precio,
            imagen: actualizarJuegoDto.imagen,
            Ediciones: actualizarJuegoDto.Ediciones,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
