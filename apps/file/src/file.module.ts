import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaModule } from '@app/libs/modules/database/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { destination } from '@app/libs/constants';
import { storage } from './common/stotage';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: destination,
      storage,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, MicroService.register(SERVICE_NAMES.AUTH)],
})
export class FileModule {}
