import { MiddlewareConsumer, Module, NestModule, Post } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BlogModule } from './api//blog/blog.module';
import { AuthMiddleware } from './api/auth/auth.middleware';
import { AuthModule } from './api/auth/auth.module';
import { FollowModule } from './api/follow/follow.module';
import { CommentModule } from './api/post/comment/comment.module';
import { PostModule } from './api/post/post.module';
import { UserModule } from './api/user/user.module';
import { Blog } from './entity/blog.entity';
import { Comment } from './entity/comment.entity';
import { Follow } from './entity/follow.entity';
import { PostState } from './entity/post-state.entity';
import { User } from './entity/user.entity';
import { EnvModule } from './env/env.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User, Blog, Follow, Post, PostState, Comment],
        autoLoadEntities: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get('NODE_ENV') === 'development' ? true : false,
      }),
    }),
    EnvModule,
    UserModule,
    AuthModule,
    BlogModule,
    FollowModule,
    PostModule,
    CommentModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/api/v1/auth/oauth/(.*)')
      .forRoutes('/api/v1');
  }
}
