import { EntityRepository } from 'typeorm'
import { PostsEntity } from '../entities'
import { ResourceRepository } from '@/shared/repositories/resource.repository'

@EntityRepository(PostsEntity)
export class PostsRepository extends ResourceRepository<PostsEntity> {}
