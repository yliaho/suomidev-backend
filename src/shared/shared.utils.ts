import { readFile } from 'fs'
import { promisify } from 'util'

/**
 * Promisifed FS readFile function.
 * ```ts
 * const file = readFileAsync('path/to/my.file')
 * console.log(file) // --> Promise<Buffer>
 * ```
 */
export const readFileAsync = promisify(readFile)
