import { JuegoService } from 'src/juego/juego.service';
export declare class BuscarController {
    private readonly buscarService;
    constructor(buscarService: JuegoService);
    listar(res: any, req: any): Promise<any>;
}
