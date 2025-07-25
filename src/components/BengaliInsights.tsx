"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBengaliInsights } from '@/app/actions';
import { Sparkles } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface BengaliInsightsProps {
  bengaliDate: string;
  gregorianDate: string;
}

export default function BengaliInsights({ bengaliDate, gregorianDate }: BengaliInsightsProps) {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    // Reset when the date changes
    setInsights('');
    setIsLoading(false);
    setError('');
    setIsFetched(false);
  }, [bengaliDate]);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    setIsFetched(true);
    try {
      const result = await getBengaliInsights({ bengaliDate, gregorianDate });
      setInsights(result.culturalSignificance);
    } catch (e: any) {
      console.error(e);
      if (e.message && (e.message.includes('API key not valid') || e.message.includes('API key not found'))) {
          setError('AI বৈশিষ্ট্যটি কনফিগার করা নেই। অনুগ্রহ করে আপনার হোস্টিং প্রদানকারীর (उदा. Vercel) সেটিংসে GOOGLE_API_KEY এনভায়রনমেন্ট ভেরিয়েবল সেট করুন।');
      } else {
        setError('তথ্য আনতে সমস্যা হয়েছে। বিস্তারিত জানতে ব্রাউজার কনসোল দেখুন অথবা আবার চেষ্টা করুন।');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetched) {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-lg font-headline">সাংস্কৃতিক তথ্য</h3>
            {isLoading && (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {insights && (
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                <p className="text-sm leading-relaxed">{insights}</p>
                </CardContent>
            </Card>
            )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg font-headline">সাংস্কৃতিক তথ্য</h3>
      <div className="flex flex-col gap-4 p-4 items-center text-center border-2 border-dashed rounded-lg">
        <Sparkles className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">এই দিনের সাংস্কৃতিক ও ধর্মীয় তাৎপর্য সম্পর্কে জানতে চান?</p>
        <Button onClick={fetchInsights} disabled={isLoading} size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? 'লোড হচ্ছে...' : 'জেনারেট করুন'}
        </Button>
      </div>
    </div>
  );
}
