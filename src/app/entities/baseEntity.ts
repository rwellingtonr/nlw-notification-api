import { randomUUID } from 'node:crypto';

export class BaseEntity {
  private _id: string;

  constructor() {
    this._id = randomUUID();
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}
