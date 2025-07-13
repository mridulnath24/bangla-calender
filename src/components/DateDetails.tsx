import type { PanchangDate, PanchangDetails } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { SunriseIcon, SunsetIcon, MoonriseIcon, MoonsetIcon } from './PanchangIcons';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface DateDetailsProps {
  date: PanchangDate;
  onClose?: () => void;
}

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const PanchangSection = ({ title, details }: { title: string, details: PanchangDetails }) => (
    <div className="space-y-4">
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


export default function DateDetails({ date, onClose }: DateDetailsProps) {
  if (!date) return null;

  const fullBengaliDate = `${date.bengaliMonth} ${toBengaliNumber(date.bengaliDate)}, ${toBengaliNumber(date.bengaliYear)}, ${date.bengaliWeekday}`;
  const gregorianDate = new Date(date.gregorianYear, date.gregorianMonth, date.gregorianDate).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <ScrollArea className="h-full">
      <Card className="shadow-lg h-full border-0 lg:border relative bg-card">
        <CardHeader className="p-0">
           <div className="bg-primary text-primary-foreground p-4 text-center relative">
                <CardTitle className="font-headline text-xl">{fullBengaliDate}</CardTitle>
                {onClose && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                )}
           </div>
           <div className="bg-primary/80 text-primary-foreground grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs p-2 text-center">
                <div className="flex items-center justify-center gap-2">
                    <SunriseIcon className="h-5 w-5" />
                    <div><strong>সূর্যোদয়</strong><p>{date.sunrise}</p></div>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <SunsetIcon className="h-5 w-5" />
                    <div><strong>সূর্যাস্ত</strong><p>{date.sunset}</p></div>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <MoonriseIcon className="h-5 w-5" />
                    <div><strong>চন্দ্রোদয়</strong><p>{date.moonrise}</p></div>
                </div>
                 <div className="flex items-center justify-center gap-2">
                    <MoonsetIcon className="h-5 w-5" />
                    <div><strong>চন্দ্রাস্ত</strong><p>{date.moonset}</p></div>
                </div>
           </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
                <DetailRow label="বাংলা তারিখ" value={`${date.bengaliMonth} ${toBengaliNumber(date.bengaliDate)}, ${toBengaliNumber(date.bengaliYear)}`} />
                <DetailRow label="গ্রেগরীয়" value={gregorianDate} />
                <DetailRow label="বিক্রম সম্বৎ" value={date.vikramSamvat} />
                <DetailRow label="শক সংবৎ" value={date.sakaSamvat} />
                <DetailRow label="ভারতীয় সিভিল" value={date.indianCivilDate} />
            </div>
            <Separator />
            <div className="space-y-2">
                <DetailRow label="চন্দ্র রাশি" value={date.chandraRashi} />
                <DetailRow label="সূর্য রাশি" value={date.suryaRashi} />
            </div>
             <Separator />
             {date.events.length > 0 && (
                <>
                <div className="space-y-2 text-center">
                    <h3 className="font-headline text-lg text-primary">উৎসব, ব্রত, উপবাস</h3>
                    {date.events.map(event => <p key={event}>{event}</p>)}
                </div>
                <Separator />
                </>
             )}
            
            <PanchangSection title="দৃকসিদ্ধ" details={date.drikSiddha} />
            <Separator />
            <PanchangSection title="সূর্য সিদ্ধান্ত" details={date.suryaSiddhanta} />

        </CardContent>
      </Card>
    </ScrollArea>
  );
}
