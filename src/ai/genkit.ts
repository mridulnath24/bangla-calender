import {genkit, Generation, Model} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import nextJS from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    nextJS(),
    googleAI({
      apiVersion: ['v1', 'v1beta'],
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
  enableTracing: process.env.NODE_ENV !== 'production',
  logLevel: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
});
