import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Length, IsAlphanumeric, IsUrl, IsFQDN } from 'class-validator'
import { PostsEntity } from '../../posts'
import { CommentsEntity } from '@/resources/comments'

@Entity()
export class UsersEntity {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  @Length(1, 24, {
    message: 'Display names has to be 0-24 characters long.'
  })
  @IsAlphanumeric({
    message: 'Display names can only contain alphanumeric characters.'
  })
  displayName: string

  @Column({ nullable: true })
  @Length(0, 4 * 1000)
  @IsUrl(null)
  avatarUrl: string

  @OneToMany(type => PostsEntity, submission => submission.submitter)
  submissions: PostsEntity[]

  @OneToMany(type => CommentsEntity, comment => comment.submitter)
  comments: PostsEntity[]
}
