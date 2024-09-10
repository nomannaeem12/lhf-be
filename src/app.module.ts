import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './resources/authentication/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './resources/authentication/authentication.module';
import { JwtStrategy } from './resources/authentication/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { CarriersModule } from './resources/carriers/carriers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    MongooseModule.forRoot(
      'mongodb+srv://sijawalayoub:sijawalpass@cluster0.8zhi20u.mongodb.net',
    ),
    AuthenticationModule,
    CarriersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
