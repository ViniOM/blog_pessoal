import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
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

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id: id },
    });

    if (!postagem) {
      throw new HttpException(
        `Postagem com o 'id ${id}' não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(postagem, HttpStatus.OK);
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    const postagem = await this.postagemRepository.find({
      where: { titulo: ILike(`%${titulo}%`) },
    });

    if (postagem.length == 0) {
      throw new HttpException(
        `Postagem com o 'titulo ${titulo}' não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(postagem, HttpStatus.OK);
  }

  async create(postagem: Postagem): Promise<Postagem> {
    if (!postagem.titulo || !postagem.texto) {
      throw new HttpException(
        `Esta faltando campos obrigatorios para criar a postagem`,
        HttpStatus.NOT_FOUND,
        {
          cause: new Error('Cause Error'),
        },
      );
    }
    const newPostagem = await this.postagemRepository.save(postagem);
    throw new HttpException(newPostagem, HttpStatus.CREATED);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    const buscaPostagem = await this.postagemRepository.findOne({
      where: { id: postagem.id },
    });

    if (!buscaPostagem || !postagem.id) {
      throw new HttpException(
        `Postagem: '${postagem.id}' não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const postagemAtualizada = await this.postagemRepository.save(postagem);
    return postagemAtualizada;
  }

  async delete(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({ where: { id } });

    if (!postagem)
      throw new HttpException(
        `Postagem 'id: ${id}' não encontrada!`,
        HttpStatus.NOT_FOUND,
        { cause: 'Não existe esse ID no banco de dados' },
      );
    await this.postagemRepository.delete(id);
    throw new HttpException(postagem, HttpStatus.NO_CONTENT);
  }
}
