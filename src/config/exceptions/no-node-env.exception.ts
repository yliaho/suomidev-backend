import { InternalException } from '@/shared/exceptions'

export class NoNodeEnvException extends InternalException {
  constructor() {
    super('ConfigCoreService: NODE_ENV is not set.')
  }
}
