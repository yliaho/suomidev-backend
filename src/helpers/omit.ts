export type Except<T, P> = Pick<T, Exclude<keyof T, P>>
