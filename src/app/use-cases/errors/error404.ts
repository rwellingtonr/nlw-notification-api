export class Error404 extends Error {
  constructor(message: string) {
    super(`NOT FOUND: ${message}`);
  }
}
