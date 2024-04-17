import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaController } from './Controllers/tema.controller';
import { TemaService } from './services/tema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  controllers: [TemaController],
  providers: [TemaService],
  exports: [TypeOrmModule],
})
export class TemaModule {}
