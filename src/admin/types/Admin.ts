import { Exclude } from 'class-transformer';
export interface Admin {
  id: number;
  username: string;
  password: string;
}

export class SerializedAdmin {
  username: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedAdmin>) {
    Object.assign(this, partial);
  }
}
