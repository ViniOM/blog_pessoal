import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Postagem')
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findByid(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/titulo/:id')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('id') id: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/criar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.CREATED)
  async atualizar(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.postagemService.delete(id);
  }
}
