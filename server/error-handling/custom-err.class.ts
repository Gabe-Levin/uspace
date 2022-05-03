export class CustomError extends Error {
  message;
  constructor (message: string) {
    super();
    this.message = message;
  }
}
