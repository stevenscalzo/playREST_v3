import * as mongoose from 'mongoose';
export declare const juegoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    nombre: string;
    descripcion: string;
    edad: number;
    jugadores: number;
    precio: number;
    Ediciones: mongoose.Types.DocumentArray<{
        edicion: string;
        anyo?: number;
    }>;
    tipo?: "rol" | "escape" | "dados" | "fichas" | "cartas" | "tablero";
    imagen?: string;
}>;
