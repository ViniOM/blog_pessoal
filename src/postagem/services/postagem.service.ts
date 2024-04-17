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

    return postagemLista;
  }

  async findById(id: number): Promise<Postagem> {
    let postagem = await this.postagemRepository.findOne({
      where: { id: id },
    });

    if (!postagem) {
      throw new HttpException(
        `Postagem com o 'id ${id}' não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return postagem;
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

    return postagem;
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
    return await this.postagemRepository.save(postagem);
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

    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    const postagem = await this.findById(id);

    if (!postagem)
      throw new HttpException(
        `Postagem 'id: ${id}' não encontrada!`,
        HttpStatus.NOT_FOUND,
        { cause: 'Não existe esse ID no banco de dados' },
      );

    return await this.postagemRepository.delete(id);
  }
}
