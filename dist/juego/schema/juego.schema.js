"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juegoSchema = void 0;
const mongoose = require("mongoose");
let edicionSchema = new mongoose.Schema({
    edicion: {
        type: String,
        required: true,
        trim: true
    },
    anyo: {
        type: Number,
        min: 2000,
        max: new Date().getFullYear()
    }
});
exports.juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    jugadores: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero']
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    imagen: {
        type: String
    },
    Ediciones: [edicionSchema]
});
//# sourceMappingURL=juego.schema.js.map