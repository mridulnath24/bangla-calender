import type { PanchangDate } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BengaliInsights from './BengaliInsights';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface DateDetailsProps {
  date: PanchangDate;
}

export default function DateDetails({ date }: DateDetailsProps) {
  if (!date) return null;

  const fullBengaliDate = `${toBengaliNumber(date.bengaliDate)} ${date.bengaliMonth}, ${toBengaliNumber(date.bengaliYear)}`;
  const gregorianDate = new Date(date.gregorianYear, date.gregorianMonth, date.gregorianDate).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <ScrollArea className="h-full">
      <Card className="shadow-lg h-full border-0 lg:border">
        <CardHeader className="pt-6">
          <CardTitle className="font-headline text-2xl text-primary">{fullBengaliDate}</CardTitle>
          <CardDescription className="text-lg">{date.bengaliWeekday}</CardDescription>
          <CardDescription>{gregorianDate}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg font-headline">পঞ্চانگ</h3>
            <div className="text-sm space-y-2 pl-2 border-l-2 border-primary/50">
              <p><span className="font-medium text-foreground/80">তিথি:</span> {date.tithi.name} (শেষ {toBengaliNumber(date.tithi.endTime)})</p>
              <p><span className="font-medium text-foreground/80">নক্ষত্র:</span> {date.nakshatra.name} (শেষ {toBengaliNumber(date.nakshatra.endTime)})</p>
              <p><span className="font-medium text-foreground/80">চন্দ্র পর্ব:</span> {date.moonPhase}</p>
            </div>
          </div>
          
          {date.events.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg font-headline">উৎসব ও বিশেষ দিন</h3>
              <div className="flex flex-wrap gap-2">
                {date.events.map(event => (
                  <Badge key={event} variant={event.includes('পূজা') ? 'default' : 'secondary'} className="text-base font-normal bg-primary/10 text-primary-foreground border-primary/20 hover:bg-primary/20">{event}</Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <BengaliInsights bengaliDate={fullBengaliDate} />
          
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
