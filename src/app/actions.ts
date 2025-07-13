'use server';

import { bengaliInsightsFlow, type BengaliInsightsInput } from '@/ai/flows/bengali-insights';

export async function getBengaliInsights(input: BengaliInsightsInput) {
  // The 'use server' directive at the top of this file means this function
  // will only ever run on the server, never on the client.
  // We can safely call our Genkit flow here.
  return await bengaliInsightsFlow(input);
}
