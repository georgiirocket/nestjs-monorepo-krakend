declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORE_APP_PORT: string;
      USER_APP_PORT: string;
      POST_APP_PORT: string;
      CORE_SERVICE_HOST: string;
      USER_SERVICE_HOST: string;
      POST_SERVICE_HOST: string;
      CORE_SERVICE_PORT: string;
      USER_SERVICE_PORT: string;
      POST_SERVICE_PORT: string;
      NODE_ENV?: 'production';
    }
  }
}

export {};
