import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.POSTGRES_SUPABASE_URL': JSON.stringify(env.POSTGRES_SUPABASE_URL),
        'process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY),
        'process.env.POSTGRES_SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(env.POSTGRES_SUPABASE_SERVICE_ROLE_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
