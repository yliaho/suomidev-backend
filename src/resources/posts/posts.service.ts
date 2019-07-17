import { Injectable } from '@nestjs/common'
import { PostsRepository } from './repositories/posts.repository'
import { SubmitNewPostDto } from './interfaces/submit-new-post.dto'

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getAllPosts() {
    return this.postsRepository.find()
  }

  getOnePost(id: string) {
    return this.postsRepository.findOne(id)
  }

  async submitNewPost(submitNewPostDto: SubmitNewPostDto) {
    return this.postsRepository.validateAndSave(submitNewPostDto)
  }
}
