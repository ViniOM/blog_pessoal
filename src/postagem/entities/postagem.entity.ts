import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

@Entity({ name: 'tb_postagem' })
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
}
