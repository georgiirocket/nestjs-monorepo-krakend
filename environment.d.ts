declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GATEWAY_PORT: string;
      USER_SERVICE_HOST: string;
      POST_SERVICE_HOST: string;
      USER_SERVICE_PORT: string;
      POST_SERVICE_PORT: string;
      NODE_ENV?: 'production';
    }
  }
}

export {};
