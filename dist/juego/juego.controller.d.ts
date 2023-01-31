import { JuegoService } from './juego.service';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { EdicionDto } from './dto/edicion-dto/edicion-dto';
export declare class JuegoController {
    private readonly juegoService;
    constructor(juegoService: JuegoService);
    listar(res: any, session: any): Promise<any>;
    buscarPorId(res: any, id: string, session: any): Promise<any>;
    editarPorId(res: any, id: string, session: any): Promise<any>;
    crear(res: any, crearJuegoDto: JuegoDto, file: any, session: any): Promise<any>;
    actualizar(res: any, id: string, actualizarJuegoDto: JuegoDto, file: any, session: any): Promise<any>;
    borrar(res: any, id: string, session: any): Promise<any>;
    editarEdiciones(res: any, id: string, session: any): Promise<any>;
    borrarEdicion(res: any, idJuego: string, idEdicion: string, session: any): Promise<any>;
    agregarEdiciones(res: any, id: string, session: any, agregarEdicionDto: EdicionDto): Promise<any>;
}
