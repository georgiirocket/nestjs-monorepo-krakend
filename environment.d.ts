declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER_APP_PORT: string;
      POST_APP_PORT: string;
      AUTH_APP_PORT: string;
      FILE_APP_PORT: string;
      AUTH_SERVICE_HOST: string;
      FILE_SERVICE_HOST: string;
      AUTH_SERVICE_PORT: string;
      FILE_SERVICE_PORT: string;
      JWT_SECRET: string;
      NODE_ENV?: 'production';
    }
  }
}

export {};
