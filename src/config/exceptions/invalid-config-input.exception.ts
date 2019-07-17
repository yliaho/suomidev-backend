import { InternalException } from '@/shared/exceptions'

export class InvalidConfigInput extends InternalException {
  constructor(reason: string) {
    super(`ConfigCoreService: Could not read config file: ${reason}`)
  }
}
