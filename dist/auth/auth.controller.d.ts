import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(res: any, req: any, body: any): Promise<void>;
    listar(res: any): Promise<any>;
    cerrarSession(res: any, req: any): Promise<void>;
}
