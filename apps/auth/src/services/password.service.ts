import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../constants';
import { ComparePasswordDto } from '@app/libs/dto/auth/compare-password';

/**
 * Password service
 */
@Injectable()
export class PasswordService {
  /**
   * Create hash
   * @param password
   */
  async createHash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare password
   * Return isMatch flag
   */
  async comparePassword(data: ComparePasswordDto): Promise<boolean> {
    return bcrypt.compare(data.password, data.hash);
  }
}
