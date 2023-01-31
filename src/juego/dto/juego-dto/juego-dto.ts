import { Edicion } from '../../interfaces/edicion/edicion.interface';
import { isEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JuegoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsString()
  descripcion: string;
  @IsNotEmpty()
  @IsNumber()
  edad: number;
  @IsNotEmpty()
  @IsNumber()
  jugadores: number;
  @IsNotEmpty()
  @IsString()
  tipo: string;
  @IsNotEmpty()
  @IsNumber()
  precio: number;
  @IsString()
  imagen: string;
  Ediciones: Edicion[];
}
