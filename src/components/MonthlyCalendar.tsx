"use client";

import type { PanchangDate } from '@/lib/types';
import { BENGALI_WEEKDAYS, BENGALI_WEEKDAYS_SHORT, toBengaliNumber } from '@/lib/bengali-helpers';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthlyCalendarProps {
  monthData: PanchangDate[];
  selectedDate: PanchangDate;
  onDateSelect: (date: PanchangDate) => void;
  bengaliMonth: string;
  bengaliYear: string;
}

export default function MonthlyCalendar({ monthData, selectedDate, onDateSelect, bengaliMonth, bengaliYear }: MonthlyCalendarProps) {
  if (monthData.length === 0) {
    return null;
  }

  const getWeekdayIndex = (weekday: string) => {
    return BENGALI_WEEKDAYS.findIndex(d => d === weekday);
  };
  
  const startingDayOfWeek = getWeekdayIndex(monthData[0].bengaliWeekday);
  const emptyDays = Array.from({ length: startingDayOfWeek < 0 ? 0 : startingDayOfWeek });

  return (
    <Card className="overflow-hidden shadow-lg bg-card">
      <CardHeader className="text-center bg-primary/10">
        <CardTitle className="text-2xl font-headline text-primary">{bengaliMonth} {bengaliYear}</CardTitle>
      </CardHeader>
      <CardContent className="p-1 md:p-2">
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-muted-foreground">
          {BENGALI_WEEKDAYS_SHORT.map(day => (
            <div key={day} className="py-2 text-sm">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-16 md:h-24" />
          ))}
          {monthData.map(date => (
            <button
              key={date.bengaliDate}
              onClick={() => onDateSelect(date)}
              aria-pressed={selectedDate.bengaliDate === date.bengaliDate}
              className={cn(
                "relative flex flex-col items-center justify-start p-1.5 border-2 rounded-lg transition-all duration-200 text-left h-16 md:h-24 overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:z-10",
                {
                  "bg-accent text-accent-foreground border-accent": selectedDate.bengaliDate === date.bengaliDate,
                  "hover:bg-primary/10 dark:hover:bg-primary/20": selectedDate.bengaliDate !== date.bengaliDate,
                  "border-primary": date.isToday,
                  "border-transparent": !date.isToday && selectedDate.bengaliDate !== date.bengaliDate,
                }
              )}
            >
              <span className={cn("text-lg md:text-xl font-headline", {"text-primary": date.isToday && selectedDate.bengaliDate !== date.bengaliDate})}>{toBengaliNumber(date.bengaliDate)}</span>
              <span className="text-xs text-muted-foreground">{date.gregorianDate}</span>
              <div className="absolute bottom-1 right-1 flex flex-col items-end gap-1 md:bottom-2 md:right-2">
                {date.events.some(e => e.includes('পূর্ণিমা') || e.includes('অমাবস্যা') || e.includes('একাদশী')) &&
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" title="বিশেষ তিথি"></div>
                }
                {date.events.some(e => !e.includes('পূর্ণিমা') && !e.includes('অমাবস্যা') && !e.includes('একাদশী') && e.length > 0) &&
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" title="উৎসব"></div>
                }
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
