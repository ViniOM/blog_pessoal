import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    let busca = await this.temaRepository.find({
      relations: {
        postagem: true,
      },
    });

    if (busca.length == 0)
      throw new HttpException('Nenhum Tema cadastrado!', HttpStatus.NOT_FOUND);

    return busca;
  }

  async findById(id: number): Promise<Tema> {
    let tema = await this.temaRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        postagem: true,
      },
    });

    if (!tema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return tema;
  }

  async findByDescricao(descricao: string): Promise<Tema[]> {
    let buscaDesc = await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagem: true,
      },
    });

    if (!buscaDesc)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return buscaDesc;
  }

  async create(tema: Tema): Promise<Tema> {
    let buscaTema = await this.temaRepository.findOne({
      where: {
        descricao: tema.descricao,
      },
    });

    if (buscaTema)
      throw new HttpException('Tema ja existente!', HttpStatus.NOT_FOUND);

    return await this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema> {
    let buscaTema = await this.findById(tema.id);

    if (!buscaTema || !tema.id)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaTema = await this.findById(id);

    if (!buscaTema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.temaRepository.delete(id);
  }
}
