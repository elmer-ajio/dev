

const ContentSecurityPolicy = `
  default-src 'self' blob:;
  script-src 'self' 'unsafe-inline' blob:;
  connect-src 'self' blob:;
  font-src 'self' data:;
  img-src 'self' blob: data:;
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'self';
  form-action 'self';
  object-src 'self' data: blob:;
  worker-src 'self' blob:;
  frame-src 'self' blob:;
  media-src 'self' data: blob:;
`;

const state: ConfigState  = {
    APP_HOST: process.env.APP_HOST!,

    HOST: process.env.HOST!,

    NODE_ENV: process.env.NODE_ENV!,
  
    PORT: Number(process.env.PORT),

    CORS_ORIGIN: [],

    contentSecurityPolicy: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),

    xContentSecurityPolicy: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
};

const configHandler: ConfigHandler = {
    
    get(target: ConfigState, property: keyof ConfigState) {
        if (!(property in target)) {
          throw new Error(
            `Attempted to access an undefined config property: ${property}`
          );
        }
          
        return Reflect.get(target, property);
        },
  
  
    set(target: ConfigState, property: keyof ConfigState, value: any): boolean {
          
          return Reflect.set(target, property, value);
        },
  };

const config = new Proxy(state, configHandler);

export default config;

