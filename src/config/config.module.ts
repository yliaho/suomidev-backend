import { Inject, Module, Global } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ValueProvider } from '@nestjs/common/interfaces'

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
