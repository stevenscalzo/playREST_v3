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
exports.BuscarController = void 0;
const common_1 = require("@nestjs/common");
const juego_service_1 = require("../juego/juego.service");
let BuscarController = class BuscarController {
    constructor(buscarService) {
        this.buscarService = buscarService;
    }
    async listar(res, req) {
        const resultado = await this.buscarService.buscarPorTexto(req.param('search'));
        if (resultado.length == 0) {
            return res.render('publico_index', {
                error: 'No se han encontrado juegos',
            });
        }
        return res.render('publico_index', { juegos: resultado });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuscarController.prototype, "listar", null);
BuscarController = __decorate([
    (0, common_1.Controller)('buscar'),
    __metadata("design:paramtypes", [juego_service_1.JuegoService])
], BuscarController);
exports.BuscarController = BuscarController;
//# sourceMappingURL=buscar.controller.js.map