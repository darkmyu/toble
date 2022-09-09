import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  path: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  followingCount: number;

  @Column({ default: 0 })
  followerCount: number;

  @Column('timestampz')
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestampz')
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
