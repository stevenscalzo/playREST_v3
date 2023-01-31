import { Edicion } from '../edicion/edicion.interface';
export interface Juego {
    id: string;
    nombre: string;
    descripcion: string;
    edad: number;
    jugadores: number;
    tipo: string;
    precio: number;
    imagen: string;
    Ediciones: Edicion[];
}
