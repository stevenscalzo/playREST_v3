import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto/login-dto.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: LoginDto): Promise<{
        access_token: string;
    }>;
}
