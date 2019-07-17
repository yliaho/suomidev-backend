import { Repository, DeepPartial } from 'typeorm'
import { validate } from 'class-validator'
import { RepositoryValidationException } from '../exceptions/'

export class ResourceRepository<T> extends Repository<T> {
  public async validate(entityLike: DeepPartial<T>): Promise<void> {
    const errors = await validate(entityLike)

    if (errors.length > 0) {
      throw new RepositoryValidationException(errors)
    }
  }

  /**
   * It's just like using `Repository.prototype.create(entityLike)` then `Repository.prototype.save(entity)`,
   * except with property validation before executing the latter.
   *
   */
  public async validateAndSave(entityLike: DeepPartial<T>): Promise<T> {
    const entity = this.create(entityLike)

    // This will throw if the entityLike doesn't pass the class-validator.
    await this.validate(entity)

    return this.save(entity)
  }
}
