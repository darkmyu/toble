import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from '../../blog/model/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '' })
  shortWord: string;

  @Column()
  profileImageUrl: string;

  @Column()
  email: string;

  @Column()
  provider: string;

  @Column()
  socialId: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column('timestampz')
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestampz')
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Blog, (blog) => blog.user, { lazy: true })
  blog: Blog;
}
