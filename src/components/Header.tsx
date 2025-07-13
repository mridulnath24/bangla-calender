import type { PanchangDate } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { ShubhoDinIcon } from '@/components/ShubhoDinIcon';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

interface HeaderProps {
  today: PanchangDate | undefined;
}

export default function Header({ today }: HeaderProps) {
  const now = new Date();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
            <ShubhoDinIcon />
            <h1 className="text-xl md:text-2xl font-bold font-headline text-primary">শুভ দিন</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            {today && (
                 <div className="hidden md:flex flex-col items-end text-sm">
                    <p className="font-semibold text-primary">{`${toBengaliNumber(today.bengaliDate)} ${today.bengaliMonth}, ${toBengaliNumber(today.bengaliYear)}`}</p>
                    <p className="text-muted-foreground">{format(now, 'PPP', { locale: bn })}</p>
                 </div>
            )}
           <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
