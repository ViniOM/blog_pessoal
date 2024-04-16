import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpExceptionBody,
  Delete,
} from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult } from 'typeorm';

@Controller('postagem')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get(':id')
  findByid(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @Get('/titulo/:id')
  findByTitulo(@Param('id') id: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(id);
  }

  @Post('/post')
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put('/atualizar')
  async atualizar(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.delete(id);
  }
}
