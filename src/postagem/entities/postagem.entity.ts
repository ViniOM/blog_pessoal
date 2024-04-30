import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
console.log(__dirname);
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 1000, nullable: false })
  @IsNotEmpty()
  texto: string;

  @ApiProperty()
  @UpdateDateColumn()
  Data: Date;

  @ApiProperty()
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;

  @ApiProperty()
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
