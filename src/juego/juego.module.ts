import { Module } from '@nestjs/common';
import { JuegoController } from './juego.controller';
import { JuegoService } from './juego.service';
import { juegoSchema } from './schema/juego.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BuscarController } from '../buscar/buscar.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Juego',
        schema: juegoSchema
      },
    ]),
  ],
  controllers: [JuegoController, BuscarController],
  providers: [JuegoService]
})
export class JuegoModule {}
