"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoController = void 0;
const common_1 = require("@nestjs/common");
const juego_service_1 = require("./juego.service");
const juego_dto_1 = require("./dto/juego-dto/juego-dto");
const edicion_dto_1 = require("./dto/edicion-dto/edicion-dto");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../utils/helper");
let JuegoController = class JuegoController {
    constructor(juegoService) {
        this.juegoService = juegoService;
    }
    async listar(res, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        const resultado = await this.juegoService.listar();
        return res.render('admin_juegos', { juegos: resultado });
    }
    async buscarPorId(res, id, session) {
        if (id == 'nuevo') {
            if (!session.usuario)
                return res.render('auth_login', {
                    mensaje: 'El usuario debe registrarse',
                });
            return res.render('admin_juegos_form');
        }
        else {
            const resultado = await this.juegoService.buscarPorId(id);
            if (resultado == null) {
                return res.render('publico_error', { error: 'Juego no encontrado' });
            }
            return res.render('publico_juego', { juego: resultado });
        }
    }
    async editarPorId(res, id, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        const resultado = await this.juegoService.buscarPorId(id);
        if (resultado == null) {
            return res.render('publico_error', { error: 'Juego no encontrado' });
        }
        return res.render('admin_juegos_form', { juego: resultado });
    }
    async crear(res, crearJuegoDto, file, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        if (file) {
            crearJuegoDto.imagen = file.filename;
        }
        await this.juegoService.insertar(crearJuegoDto);
        res.redirect('/juegos');
    }
    async actualizar(res, id, actualizarJuegoDto, file, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        if (file) {
            actualizarJuegoDto.imagen = file.filename;
        }
        await this.juegoService.actualizar(id, actualizarJuegoDto);
        res.redirect('/juegos');
    }
    async borrar(res, id, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        await this.juegoService.borrar(id);
        res.redirect('/juegos');
    }
    async editarEdiciones(res, id, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        const resultado = await this.juegoService.buscarPorId(id);
        if (resultado == null) {
            return res.render('publico_error', { error: 'Juego no encontrado' });
        }
        return res.render('admin_ediciones_form', { juego: resultado });
    }
    async borrarEdicion(res, idJuego, idEdicion, session) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        const resultado = await this.juegoService.buscarPorId(idJuego);
        const ediciones = resultado.Ediciones.filter((value) => value.id != idEdicion);
        resultado.Ediciones = ediciones;
        await this.juegoService.actualizar(idJuego, resultado);
        res.redirect('/juegos');
    }
    async agregarEdiciones(res, id, session, agregarEdicionDto) {
        if (!session.usuario)
            return res.render('auth_login', {
                mensaje: 'El usuario debe registrarse',
            });
        const resultado = await this.juegoService.buscarPorId(id);
        if (resultado == null) {
            return res.render('publico_error', { error: 'Juego no encontrado' });
        }
        const edicion = {
            anyo: agregarEdicionDto.anyo,
            edicion: agregarEdicionDto.edicion,
            id: '',
        };
        resultado.Ediciones.push(edicion);
        await this.juegoService.actualizar(id, resultado);
        res.redirect('/juegos');
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Get)('editar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "editarPorId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.diskStorage)({
            destination: helper_1.Helper.destinationPath,
            filename: helper_1.Helper.customFileName,
        }),
    })),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, juego_dto_1.JuegoDto, Object, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "crear", null);
__decorate([
    (0, common_1.Post)('editar/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.diskStorage)({
            destination: helper_1.Helper.destinationPath,
            filename: helper_1.Helper.customFileName,
        }),
    })),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __param(4, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, juego_dto_1.JuegoDto, Object, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Post)('borrar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "borrar", null);
__decorate([
    (0, common_1.Get)('editar/ediciones/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "editarEdiciones", null);
__decorate([
    (0, common_1.Post)('editar/ediciones/borrar/:idJuego/:idEdicion'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('idJuego')),
    __param(2, (0, common_1.Param)('idEdicion')),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "borrarEdicion", null);
__decorate([
    (0, common_1.Post)('editar/ediciones/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, edicion_dto_1.EdicionDto]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "agregarEdiciones", null);
JuegoController = __decorate([
    (0, common_1.Controller)('juegos'),
    __metadata("design:paramtypes", [juego_service_1.JuegoService])
], JuegoController);
exports.JuegoController = JuegoController;
//# sourceMappingURL=juego.controller.js.map