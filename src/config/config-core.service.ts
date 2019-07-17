import * as dotenv from 'dotenv'
import * as Joi from '@hapi/joi'
import { configSchema } from './config.schema'
import { ConfigData } from './interfaces'
import { Injectable } from '@nestjs/common'
import { NoNodeEnvException } from './exceptions/no-node-env.exception'
import { InvalidConfigInput } from './exceptions'
import { readFileSync } from 'fs'

export class ConfigCoreService {
  protected config: ConfigData = null

  constructor(validationOptions?: Joi.ValidationOptions) {
    this.load(validationOptions)
  }

  private async load(validationOptions?: Joi.ValidationOptions) {
    const { NODE_ENV } = process.env

    // If NODE_ENV is undefined, throw error...
    if (!NODE_ENV) {
      throw new NoNodeEnvException()
    }

    try {
      const configBuffer = readFileSync(`${NODE_ENV}.env`)
      const configParsed = dotenv.parse(configBuffer)

      this.config = await ConfigCoreService.validate(
        Object.assign({}, configParsed, { NODE_ENV }),
        validationOptions
      )
    } catch (err) {
      throw new InvalidConfigInput(err)
    }
  }

  static validate(
    value: any,
    validationOptions: Joi.ValidationOptions = {}
  ): Promise<ConfigData> {
    const schema = Joi.object(configSchema)

    const { error, value: validatedConfig } = Joi.validate<ConfigData>(
      value,
      schema,
      validationOptions
    )

    if (error) {
      Promise.reject(error.message)
    }

    return Promise.resolve(validatedConfig)
  }
}
