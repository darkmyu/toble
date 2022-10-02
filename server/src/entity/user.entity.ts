import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column()
  displayName: string;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Blog, (blog) => blog.user)
  blog: Blog;
}
