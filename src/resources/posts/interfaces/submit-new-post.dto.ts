import { Except } from '@/helpers/omit'
import { PostsEntity } from '../entities'

export interface SubmitNewPostDto extends Except<PostsEntity, 'id'> {}
