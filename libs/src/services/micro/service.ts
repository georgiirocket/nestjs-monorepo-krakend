import { Provider } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import * as process from 'node:process';

/**
 * Micro service
 */
export class MicroService {
  /**
   * Register
   * @param name
   */
  static register(name: SERVICE_NAMES): Provider {
    return {
      provide: name,
      useFactory: () => ClientProxyFactory.create(this.getOptions(name)),
    };
  }

  /**
   * Get options
   * @param name
   */
  static getOptions(name: SERVICE_NAMES): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: process.env[`${name}_SERVICE_HOST`],
        port: Number(process.env[`${name}_SERVICE_PORT`]),
      },
    };
  }
}
