import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blog_pessoal',
      synchronize: true,
      logging: true,
      entities: [Postagem, Tema],
    }),
    PostagemModule,
    TemaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
