import { NodeEnvs, HasConfigDataInterfaceKeys } from './interfaces'

export const DEFAULT_NODE_ENV = NodeEnvs.DEVELOPMENT
export const VALID_NODE_ENV_STRINGS = Object.values(NodeEnvs)

/**
 * Config Schema defaults
 */
export const configSchemaDefaults: Partial<HasConfigDataInterfaceKeys> = {
  APP_PORT: 3000,
  APP_HOST: 'localhost',
  DB_HOST: 'localhost'
}
