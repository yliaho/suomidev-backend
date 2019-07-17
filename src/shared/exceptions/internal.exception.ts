export class InternalException extends Error {
  constructor(message?: string) {
    super(message)
    const proto = new.target.prototype
    Object.setPrototypeOf(this, proto)
  }
}
