import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Length } from 'class-validator'
import { UsersEntity } from '../../users'
import { CommentsEntity } from '@/resources/comments'

@Entity()
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Length(1, 140, {
    message: 'Submission titles has to be 1-140 characters long.'
  })
  title: string

  @OneToMany(type => CommentsEntity, comment => comment.post)
  comments: CommentsEntity

  @Column()
  @Length(1, 10 * 1000, {
    message: 'Your submission is too long (max. 10,000 characters)'
  })
  markdown: string

  @ManyToOne(type => UsersEntity, user => user.submissions)
  submitter: UsersEntity
}
