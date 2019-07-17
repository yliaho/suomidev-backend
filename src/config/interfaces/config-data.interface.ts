/**
 * The configuration object interface.
 */
export interface ConfigData {
  NODE_ENV: string
  APP_HOST: string
  APP_PORT: number
  DB_USE_DATABASE: string
  DB_HOST: string
  DB_PORT: number
  DB_USERNAME: string
  DB_PASSWORD: string
}

/**
 * Makes the property types on ConfigData to `any`.
 * Used to make sure the `config.schema` is validating against an input that correclty implements the interface.
 */
export type HasConfigDataInterfaceKeys<T = ConfigData> = {
  [P in keyof T]: any
}
