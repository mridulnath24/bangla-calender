"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBengaliInsights } from '@/ai/flows/bengali-insights';
import { Sparkles } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface BengaliInsightsProps {
  bengaliDate: string;
}

export default function BengaliInsights({ bengaliDate }: BengaliInsightsProps) {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    setIsFetched(true);
    try {
      const result = await getBengaliInsights({ bengaliDate });
      setInsights(result.insights);
    } catch (e) {
      setError('তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      console.error(e);
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
