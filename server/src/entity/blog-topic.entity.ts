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

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}
