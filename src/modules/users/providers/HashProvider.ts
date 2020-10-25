import { hash, compare } from 'bcryptjs'

export default class BCryptHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 12);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
