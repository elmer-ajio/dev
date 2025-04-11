/// <reference types="node" />


declare global {
  type ConfigState = {
    APP_HOST: string;
    HOST: string;
    NODE_ENV: string;
    PORT: number;
    CORS_ORIGIN: string[];
    contentSecurityPolicy: string;
    xContentSecurityPolicy: string;
  };
  type ConfigHandler = {
    get(target: ConfigState, property: keyof ConfigState): ConfigState[keyof ConfigState];
    set(target: ConfigState, property: keyof ConfigState, value: ConfigState[keyof ConfigState]): boolean;
  }; 
  type Config = ConfigState;

  

}

export {};