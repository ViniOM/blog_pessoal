import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  descricao: string;
  
  @ApiProperty()
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
