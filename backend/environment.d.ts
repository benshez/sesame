// environment.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'staging';
      PORT: string;
      DATABASE_URL: string;
      API_KEY: string;
    }
  }
}

export {};