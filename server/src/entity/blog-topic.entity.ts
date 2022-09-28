import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('timestampz')
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestampz')
  @UpdateDateColumn()
  updatedAt: Date;
}
