import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  commentsCount: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;
}
