import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BuscarService } from './buscar/buscar.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JuegoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/juegos'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, BuscarService],
})
export class AppModule {}
