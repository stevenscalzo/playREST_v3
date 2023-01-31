import { Juego } from './interfaces/juego/juego.interface';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Model } from 'mongoose';
export declare class JuegoService {
    private readonly juegoModel;
    constructor(juegoModel: Model<Juego>);
    listar(): Promise<Juego[]>;
    buscarPorTexto(texto: string): Promise<Juego[]>;
    insertar(crearJuegoDto: JuegoDto): Promise<Juego>;
    buscarPorId(id: string): Promise<Juego>;
    borrar(id: string): Promise<Juego>;
    actualizar(id: string, actualizarJuegoDto: JuegoDto): Promise<Juego>;
}
