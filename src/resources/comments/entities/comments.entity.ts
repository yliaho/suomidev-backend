import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  OneToOne
} from 'typeorm'
import { Length } from 'class-validator'
import { UsersEntity } from '@/resources/users'
import { PostsEntity } from '@/resources/posts'

@Entity()
export class CommentsEntity {
  /**
   * Primary identifier.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * The post which this or the top-level comment was written for.
   */
  @ManyToOne(type => PostsEntity, post => post.comments)
  post: PostsEntity

  /**
   * Parent comment for child comments.
   */
  @ManyToOne(type => CommentsEntity, comment => comment.children)
  parent: CommentsEntity

  /**
   * Comments which were replied to parent comment.
   */
  @OneToMany(type => CommentsEntity, comment => comment.parent)
  children: CommentsEntity

  /**
   * Markdown content of the comment.
   */
  @Column()
  @Length(0, 10 * 1000, {
    message: 'Your comment is too long (max. 10,000 characters)'
  })
  markdown: string

  /**
   * The submitting user.
   */
  @ManyToOne(type => UsersEntity, user => user.comments)
  submitter: UsersEntity
}
