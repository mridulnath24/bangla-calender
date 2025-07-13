'use server';

/**
 * @fileOverview Provides detailed panchang and cultural insights for a specific Bengali calendar date.
 *
 * - getBengaliInsights - A function that retrieves panchang details for a given Bengali date.
 * - BengaliInsightsInput - The input type for the getBengaliInsights function.
 * - BengaliInsightsOutput - The return type for the getBengaliInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BengaliInsightsInputSchema = z.object({
  bengaliDate: z
    .string()
    .describe('The Bengali date for which to retrieve insights. Example format: ২৮ আষাঢ় ১৪৩২'),
  gregorianDate: z
    .string()
    .describe('The corresponding Gregorian date. Example format: July 13, 2025'),
});
export type BengaliInsightsInput = z.infer<typeof BengaliInsightsInputSchema>;

const PanchangDetailsSchema = z.object({
  tithi: z.string().describe("The tithi (lunar day) with its end time. Example: 'কৃষ্ণ পক্ষ তৃতীয়া upto ০১:০৩ AM (next day)'"),
  nakshatra: z.string().describe("The nakshatra (lunar mansion) with its end time. Example: 'শ্রবণা upto ০৬:৫৩ AM'"),
  amritayog: z.object({
      day: z.string().describe("Auspicious time (Amritayog) during the day. Example: '০৬:৫০ AM - ৯:২৯ AM'"),
      night: z.string().describe("Auspicious time (Amritayog) during the night. Example: '১০:৩৮ PM - পরদিন ১২:৪৬ AM'"),
  }),
  mahendrayog: z.object({
      day: z.string().describe("Auspicious time (Mahendrayog) during the day. Example: '০৪:৩৪ PM - ০৫:২৭ PM'"),
  }),
  barabela: z.string().describe("Inauspicious time (Barabela). Example: '১০:০২ AM - ১১:৪২ AM'"),
  kalabela: z.string().describe("Inauspicious time (Kalabela). Example: '১১:৪২ AM - ০১:২১ PM'"),
  kalaratri: z.string().describe("Inauspicious time (Kalaratri). Example: '০১:০৩ AM - পরদিন ০২:২৩ AM'"),
});

const BengaliInsightsOutputSchema = z.object({
  vikramSamvat: z.string().describe("The date in the Vikram Samvat calendar system. Example: 'শ্রাবণ ০৩, ২০৮২'"),
  sakaSamvat: z.string().describe("The date in the Saka Samvat calendar system. Example: 'আষাঢ় ১৮'"),
  indianCivilDate: z.string().describe("The date in the Indian Civil Calendar. Example: 'আষাঢ় ২২, ১৯৪৭'"),
  chandraRashi: z.string().describe("The Chandra Rashi (Moon sign). Example: 'মকর'"),
  suryaRashi: z.string().describe("The Surya Rashi (Sun sign). Example: 'মিথুন'"),
  sunrise: z.string().describe("The sunrise time. Example: '০৫:০৪ AM'"),
  sunset: z.string().describe("The sunset time. Example: '০৬:২০ PM'"),
  moonrise: z.string().describe("The moonrise time. Example: '০৮:২৮ PM'"),
  moonset: z.string().describe("The moonset time. Example: '০৮:০২ AM'"),
  drikSiddha: PanchangDetailsSchema,
  suryaSiddhanta: PanchangDetailsSchema,
  culturalSignificance: z.string().describe("A brief summary of any cultural or religious significance of the day. Be concise and informative."),
});
export type BengaliInsightsOutput = z.infer<typeof BengaliInsightsOutputSchema>;

export async function getBengaliInsights(input: BengaliInsightsInput): Promise<BengaliInsightsOutput> {
  return bengaliInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bengaliInsightsPrompt',
  input: {schema: BengaliInsightsInputSchema},
  output: {schema: BengaliInsightsOutputSchema},
  prompt: `You are an expert in Bengali panjika (panchang) based on both Drik Siddha and Surya Siddhanta calculations.

  Provide a complete and accurate panchang for the following date. Ensure all fields in the output schema are populated correctly.

  Bengali Date: {{bengaliDate}}
  Gregorian Date: {{gregorianDate}}

  Generate all the required details including calendar conversions, sunrise/sunset times, rashis, and astrological timings for both Drik Siddha and Surya Siddhanta systems. Also include a brief note on any cultural or religious importance.
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
