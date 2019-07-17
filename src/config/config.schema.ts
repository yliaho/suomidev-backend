import { number, string } from '@hapi/joi'
import {
  configSchemaDefaults,
  VALID_NODE_ENV_STRINGS
} from './config.constants'
import { HasConfigDataInterfaceKeys } from './interfaces'

export const configSchema: HasConfigDataInterfaceKeys = {
  NODE_ENV: string()
    .valid(VALID_NODE_ENV_STRINGS)
    .required(),
  APP_HOST: string().default(configSchemaDefaults.APP_HOST),
  APP_PORT: number().default(configSchemaDefaults.APP_PORT),
  DB_USE_DATABASE: string().required(),
  DB_HOST: string().default(configSchemaDefaults.DB_HOST),
  DB_PORT: string().required(),
  DB_USERNAME: string().required(),
  DB_PASSWORD: string().required()
}
