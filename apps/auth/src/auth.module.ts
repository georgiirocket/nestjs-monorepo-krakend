import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/libs/modules/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { CommunicationController } from './communication.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController, CommunicationController],
  providers: [TokenService, PasswordService],
})
export class AuthModule {}
