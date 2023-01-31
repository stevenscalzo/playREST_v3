import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  app.useStaticAssets(__dirname + '/../public/uploads');
  app.useStaticAssets(__dirname + '/../node_modules/bootstrap/dist');
  app.useStaticAssets(
    __dirname + '/../node_modules/@fortawesome/fontawesome-free',
  );
  app.setViewEngine('njk');
  app.use(
    session({
      secret: '1234',
      resave: true,
      saveUninitialized: false,
      expires: new Date(Date.now() + 30 * 60 * 1000),
    }),
  );
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  await app.listen(3000);
}
bootstrap();
