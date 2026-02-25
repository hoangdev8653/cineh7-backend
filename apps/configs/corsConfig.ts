import { allowedOrigins } from '../utils/allowedOrigins';

export const corsConfig = {
  origin: (
    origin: string,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
