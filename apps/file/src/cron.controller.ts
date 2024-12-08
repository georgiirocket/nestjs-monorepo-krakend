import { Controller } from '@nestjs/common';
import { CronService } from './services/cron.services';
import { Cron } from '@nestjs/schedule';

@Controller()
export class CronController {
  constructor(private readonly cronService: CronService) {}

  /**
   * Remove is delete files
   * “At 00:00 on Sunday.”
   */
  @Cron('0 0 * * 0')
  async removeFiles(): Promise<void> {
    void this.cronService.removeFilesFromStorage();
  }
}
