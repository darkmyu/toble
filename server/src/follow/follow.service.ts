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

  async follow(followerId: number, followingId: number) {
    const userExist = await this.userRepository.findOneBy({ id: followingId });

    if (!userExist) {
      throw new NotFoundException('User is not found');
    }

    const exist = await this.followRepository.findOneBy({
      followerId,
      followingId,
    });

    if (exist) {
      throw new ConflictException('You are already following');
    }

    try {
      const follower = await this.userRepository.findOneBy({
        id: followerId,
      });
      const following = await this.userRepository.findOneBy({
        id: followingId,
      });
      const createdFollow = this.followRepository.create({
        follower,
        following,
      });

      return this.followRepository.save(createdFollow);
    } catch {
      throw new NotFoundException('errors');
    }
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
