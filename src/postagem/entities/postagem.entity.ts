import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Tema } from 'src/tema/entities/tema.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 1000, nullable: false })
  @IsNotEmpty()
  texto: string;

  @UpdateDateColumn()
  Data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
