
"use client"
import type { PanchangDate } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { SunriseIcon, SunsetIcon, MoonriseIcon, MoonsetIcon } from './PanchangIcons';
import { Button } from './ui/button';
import { X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { bengaliInsightsFlow, BengaliInsightsOutput } from '@/ai/flows/bengali-insights';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface DateDetailsProps {
  date: PanchangDate;
  onClose?: () => void;
}

const DetailRow = ({ label, value, className }: { label: string, value: string | undefined, className?: string }) => (
  <div className={cn("flex justify-between items-center text-sm", className)}>
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value || '-'}</span>
  </div>
);

const PanchangSection = ({ title, details, className }: { title: string, details: BengaliInsightsOutput['drikSiddha'] | undefined, className?: string }) => {
    if (!details) {
        return (
            <div className={cn("space-y-4", className)}>
                 <h3 className="font-headline text-lg text-primary text-center">{title}</h3>
                 <p className="text-sm text-muted-foreground text-center">তথ্য পাওয়া যায়নি।</p>
            </div>
        )
    }
    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="font-headline text-lg text-primary text-center">{title}</h3>
            <div className="space-y-2 text-sm">
                <p><span className="font-semibold">তিথি:</span> {details.tithi}</p>
                <p><span className="font-semibold">নক্ষত্র:</span> {details.nakshatra}</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-center text-base">অমৃতযোগ</h4>
                <DetailRow label="দিন" value={details.amritayog.day} />
                <DetailRow label="রাতি" value={details.amritayog.night} />
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-center text-base">মহেন্দ্রযোগ</h4>
                <DetailRow label="দিন" value={details.mahendrayog.day} />
            </div>
            <div className="space-y-2 text-sm">
                 <p><span className="font-semibold">বারবেলা:</span> {details.barabela}</p>
                 <p><span className="font-semibold">কালবেলা:</span> {details.kalabela}</p>
                 <p><span className="font-semibold">কালরাতি:</span> {details.kalaratri}</p>
            </div>
        </div>
    );
}


const GeneratedDetails = ({ details }: { details: BengaliInsightsOutput }) => (
  <CardContent className="space-y-6 p-4">
    <div className="bg-primary/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-3 text-center rounded-lg">
      <div className="flex flex-col items-center justify-center gap-1">
        <SunriseIcon className="h-6 w-6" />
        <div><strong>সূর্যোদয়</strong><p>{details.sunrise}</p></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <SunsetIcon className="h-6 w-6" />
        <div><strong>সূর্যাস্ত</strong><p>{details.sunset}</p></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <MoonriseIcon className="h-6 w-6" />
        <div><strong>চন্দ্রোদয়</strong><p>{details.moonrise}</p></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <MoonsetIcon className="h-6 w-6" />
        <div><strong>চন্দ্রাস্ত</strong><p>{details.moonset}</p></div>
      </div>
    </div>
    
    <div className="space-y-2">
      <DetailRow label="বিক্রম সম্বৎ" value={details.vikramSamvat} />
      <DetailRow label="শক সংবৎ" value={details.sakaSamvat} />
      <DetailRow label="ভারতীয় সিভিল" value={details.indianCivilDate} />
    </div>
    <Separator />
    <div className="space-y-2">
      <DetailRow label="চন্দ্র রাশি" value={details.chandraRashi} />
      <DetailRow label="সূর্য রাশি" value={details.suryaRashi} />
    </div>
    
    {details.culturalSignificance && (
      <>
        <Separator />
        <div className="space-y-3 text-center">
          <h3 className="font-semibold text-lg font-headline text-primary">সাংস্কৃতিক তথ্য</h3>
            <Card className="bg-primary/5 border-primary/20 text-left">
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed">{details.culturalSignificance}</p>
              </CardContent>
            </Card>
        </div>
      </>
    )}
    
    <Separator />
    <PanchangSection title="দৃকসিদ্ধ" details={details.drikSiddha} />
    <Separator />
    <PanchangSection title="সূর্য সিদ্ধান্ত" details={details.suryaSiddhanta} />
  </CardContent>
);

const LoadingSkeleton = () => (
    <div className="p-4 space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
        <Separator />
        <Skeleton className="h-12 w-full" />
        <Separator />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Separator />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-24 w-full" />
        </div>
    </div>
);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function DateDetails({ date, onClose }: DateDetailsProps) {
  const [details, setDetails] = useState<BengaliInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  
  const fullBengaliDateHeader = `${date.bengaliMonth} ${toBengaliNumber(date.bengaliDate)}, ${toBengaliNumber(date.bengaliYear)}, ${date.bengaliWeekday}`;
  
  const gregorianMonthName = MONTH_NAMES[date.gregorianMonth];
  const gregorianDateForDisplay = `${gregorianMonthName} ${date.gregorianDate}, ${date.gregorianYear}`;
  
  useEffect(() => {
    // Reset when the date changes
    setDetails(null);
    setIsLoading(false);
    setError('');
    setIsFetched(false);
  }, [date]);

  const fetchDetails = async () => {
    setIsLoading(true);
    setError('');
    setDetails(null);
    setIsFetched(true);
    try {
      const bengaliDateForAI = `${toBengaliNumber(date.bengaliDate)} ${date.bengaliMonth} ${toBengaliNumber(date.bengaliYear)}`;
      
      // Standardize the Gregorian date format for the AI
      const gregorianDateForAI = `${gregorianMonthName} ${date.gregorianDate}, ${date.gregorianYear}`;

      const result = await bengaliInsightsFlow({
          bengaliDate: bengaliDateForAI,
          gregorianDate: gregorianDateForAI
      });
      setDetails(result);
    } catch (e: any) {
      if (e.message && (e.message.includes('API key not valid') || e.message.includes('[GoogleGenerativeAI Error]: API key not found'))) {
          setError('AI বৈশিষ্ট্যটি কনফিগার করা নেই। অনুগ্রহ করে আপনার হোস্টিং প্রদানকারীর (उदा. Vercel) সেটিংসে GOOGLE_API_KEY এনভায়রনমেন্ট ভেরিয়েবল সেট করুন।');
      } else {
        setError('তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };


  if (!date) return null;

  return (
    <ScrollArea className="h-full">
      <Card className="shadow-lg h-full border-0 lg:border relative bg-card">
        <CardHeader className="p-0 sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
           <div className="bg-primary text-primary-foreground p-4 text-center relative">
                <CardTitle className="font-headline text-xl">{fullBengaliDateHeader}</CardTitle>
                <p className="text-sm text-primary-foreground/80">{gregorianDateForDisplay}</p>
                {onClose && (
                    <Button variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                )}
           </div>
        </CardHeader>
        
        {isFetched ? (
            <>
                {isLoading && <LoadingSkeleton />}
                {error && <p className="p-4 text-sm text-destructive text-center">{error}</p>}
                {details && <GeneratedDetails details={details} />}
            </>
        ) : (
             <div className="p-6 flex flex-col gap-6 items-center text-center border-2 border-dashed rounded-lg m-4">
                <Sparkles className="h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">এই দিনের সম্পূর্ণ পঞ্জিকা বিবরণ দেখুন</p>
                    <p className="text-sm text-muted-foreground">AI-এর সাহায্যে তিথি, নক্ষত্র, শুভ ও অশুভ সময় এবং আরও অনেক কিছু জানুন।</p>
                </div>
                 {date.events.length > 0 && (
                    <div className="text-center w-full">
                        <h3 className="font-headline text-lg text-primary mb-2">উৎসব ও বিশেষ দিন</h3>
                        <div className="bg-primary/10 p-3 rounded-md">
                        {date.events.map(event => <p key={event} className="font-medium">{event}</p>)}
                        </div>
                    </div>
                 )}
                <Button onClick={fetchDetails} disabled={isLoading} size="lg" className="w-full">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {isLoading ? 'লোড হচ্ছে...' : 'পঞ্জিকা জেনারেট করুন'}
                </Button>
            </div>
        )}
      </Card>
    </ScrollArea>
  );
}
