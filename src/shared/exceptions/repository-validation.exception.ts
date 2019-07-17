import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class RepositoryValidationException extends HttpException {
  constructor(public readonly errors: ValidationError[] = [] as any) {
    super(
      `${
        errors.length > 0
          ? errors[0].target.constructor.name
          : 'this repository'
      }: Failed validation.`,
      HttpStatus.BAD_REQUEST
    )
  }

  public getFriendyError() {
    return this.errors.reduce((text, error) => {
      return text.concat(Object.values(error.constraints).join(', '))
    }, '')
  }
}
