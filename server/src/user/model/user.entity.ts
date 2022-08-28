import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
