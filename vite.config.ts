import { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';
import dotenv from 'dotenv';

dotenv.config(); // load env vars from .env

const customConfig: UserConfigFn = (env) => ({

  // Here you can add custom Vite parameters
  // https://vitejs.ddev/config/
  define: {
    __VALUE__: `"${process.env.VALUE}"`,
  },
});

export default overrideVaadinConfig(customConfig);
