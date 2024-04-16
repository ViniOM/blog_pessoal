import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_postagem' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @Column({ length: 1000, nullable: false })
  @IsNotEmpty()
  texto: string;

  @UpdateDateColumn()
  Data: Date;
}
