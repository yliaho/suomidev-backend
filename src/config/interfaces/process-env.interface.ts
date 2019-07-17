import { NodeEnvs } from './node-envs.interface'

export type ProcessEnvObject = { [P in NodeEnvs]: boolean }
