import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    const postagemLista = await this.postagemRepository.find();

    if (postagemLista.length == 0) {
      throw new HttpException(
        'Nenhuma postagem encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(postagemLista, HttpStatus.OK);
  }
}
