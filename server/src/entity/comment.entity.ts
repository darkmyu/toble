import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column({ nullable: true })
  parentId: number | null;

  @Column({ nullable: true })
  mentionUserId: number | null;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  subCommentsCount: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'mention_user_id' })
  mentionUser: User;
}
