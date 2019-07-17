import { ConfigCoreService } from './config-core.service'
import { NodeEnvs, ProcessEnvObject } from './interfaces'
import { Injectable } from '@nestjs/common'
import { ConnectionOptions } from 'typeorm'

@Injectable()
export class ConfigService extends ConfigCoreService {
  /**
   * Core application specific, environmental critical values.
   */
  public get server() {
    return {
      host: this.config.APP_HOST,
      port: this.config.APP_PORT
    }
  }

  /**
   * Engine agnostic database credentials and other configuration.
   */
  public get database() {
    return {
      host: this.config.DB_HOST,
      port: this.config.DB_PORT,
      username: this.config.DB_USERNAME,
      password: this.config.DB_PASSWORD,
      useDatabase: this.config.DB_USE_DATABASE
    }
  }

  /**
   * PostgreSQL connection options specifically tailored for typeorm's Connection object.
   */
  public get typeormConnectionOptions(): ConnectionOptions {
    return {
      type: 'postgres',
      host: this.database.host,
      port: this.database.port,
      username: this.database.username,
      password: this.database.password,
      database: this.database.useDatabase,
      synchronize: true
    }
  }

  /**
   * Booleans for each of the valid node environmental values.
   * Returns true if the currently running NODE_ENV equals to the specified property returned by this setter.
   */
  public get isProcessIn(): ProcessEnvObject {
    const environments = Object.values(NodeEnvs).reduce<ProcessEnvObject>(
      (acc, env) => {
        acc[env] = this.config.NODE_ENV === env

        return acc
      },
      {} as ProcessEnvObject
    )

    return environments
  }
}
