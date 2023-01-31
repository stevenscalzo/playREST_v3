import { Edicion } from '../../interfaces/edicion/edicion.interface';
export declare class JuegoDto {
    nombre: string;
    descripcion: string;
    edad: number;
    jugadores: number;
    tipo: string;
    precio: number;
    imagen: string;
    Ediciones: Edicion[];
}
