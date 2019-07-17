import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from './config'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  modules as resourceModules,
  PostsEntity,
  UsersEntity,
  CommentsEntity
} from './resources/'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: ({ typeormConnectionOptions }: ConfigService) => ({
        ...typeormConnectionOptions,
        entities: [PostsEntity, UsersEntity, CommentsEntity]
      }),
      inject: [ConfigService]
    }),
    ...resourceModules
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
