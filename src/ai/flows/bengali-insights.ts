// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides cultural and religious insights related to a specific Bengali calendar date.
 *
 * - getBengaliInsights - A function that retrieves cultural and religious insights for a given Bengali date.
 * - BengaliInsightsInput - The input type for the getBengaliInsights function.
 * - BengaliInsightsOutput - The return type for the getBengaliInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BengaliInsightsInputSchema = z.object({
  bengaliDate: z
    .string()
    .describe('The Bengali date for which to retrieve cultural and religious insights. Example format: ১ আশ্বিন ১৪৩১'),
});
export type BengaliInsightsInput = z.infer<typeof BengaliInsightsInputSchema>;

const BengaliInsightsOutputSchema = z.object({
  insights: z.string().describe('Cultural and religious insights related to the specified Bengali date.'),
});
export type BengaliInsightsOutput = z.infer<typeof BengaliInsightsOutputSchema>;

export async function getBengaliInsights(input: BengaliInsightsInput): Promise<BengaliInsightsOutput> {
  return bengaliInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bengaliInsightsPrompt',
  input: {schema: BengaliInsightsInputSchema},
  output: {schema: BengaliInsightsOutputSchema},
  prompt: `You are an expert in Bengali culture and Hindu religious traditions.

  Provide cultural and religious insights related to the following Bengali date:

  {{bengaliDate}}

  Be concise and informative.
  `,
});

const bengaliInsightsFlow = ai.defineFlow(
  {
    name: 'bengaliInsightsFlow',
    inputSchema: BengaliInsightsInputSchema,
    outputSchema: BengaliInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
