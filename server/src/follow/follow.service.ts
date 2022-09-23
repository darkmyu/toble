import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user/model/user.entity';
import { Follow } from './model/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(followerId: number, followingId: number) {
    const following = await this.userRepository.findOneBy({ id: followingId });

    if (!following) {
      throw new NotFoundException('Blogger is not found');
    }

    const exist = await this.followRepository.findOneBy({
      followerId,
      followingId,
    });

    if (exist) {
      throw new ConflictException('You are already following');
    }

    try {
      const createdFollow = this.followRepository.create({
        followerId,
        followingId,
      });

      return this.followRepository.save(createdFollow);
    } catch {
      throw new NotFoundException('errors');
    }
  }

  async delete(followerId: number, followingId: number) {
    await this.followRepository.delete({ followerId, followingId });
  }

  async check(followerId: number, followingId: number) {
    const exist = await this.followRepository.findOneBy({
      followerId,
      followingId,
    });

    return exist ? true : false;
  }

  async findFollowersCount(userId: number) {
    return this.followRepository
      .createQueryBuilder('follow')
      .select('follow')
      .where('follow.followingId = :followingId', { followingId: userId })
      .getCount();
  }

  async findFavoritesCount(userId: number) {
    return this.followRepository
      .createQueryBuilder('follow')
      .select('follow')
      .where('follow.followerId = :followerId', { followerId: userId })
      .getCount();
  }
}
