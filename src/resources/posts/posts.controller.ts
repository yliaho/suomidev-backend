import { Controller, Post, Body, Param, Get } from '@nestjs/common'
import { PostsEntity } from './entities'
import { SubmitNewPostDto } from './interfaces/submit-new-post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Gets all the posts. All of 'em.
   */
  @Get()
  getAllPosts(): Promise<PostsEntity[]> {
    return this.postsService.getAllPosts()
  }

  /**
   * Gets one post with the provided ID
   * @param id identifier for the PostEntity
   */
  @Get('/:id')
  getOnePost(@Param('id') id: string): Promise<PostsEntity> {
    return this.postsService.getOnePost(id)
  }

  /**
   * Creates a new PostEntity to the database.
   * @param submitNewPostDto the aspiring PostEntity looking for some wicked fun.
   */
  @Post()
  submitNewPost(
    @Body() submitNewPostDto: SubmitNewPostDto
  ): Promise<PostsEntity> {
    return this.postsService.submitNewPost(submitNewPostDto)
  }
}
