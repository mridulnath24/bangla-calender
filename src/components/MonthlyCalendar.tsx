"use client";

import type { PanchangDate } from '@/lib/types';
import { BENGALI_WEEKDAYS, BENGALI_WEEKDAYS_SHORT, toBengaliNumber, BENGALI_MONTHS } from '@/lib/bengali-helpers';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface MonthlyCalendarProps {
  monthData: PanchangDate[];
  selectedDate: PanchangDate;
  onDateSelect: (date: PanchangDate) => void;
  bengaliMonthIndex: number;
  bengaliYear: number;
  onMonthChange: (monthIndex: number) => void;
  onYearChange: (year: number) => void;
}

export default function MonthlyCalendar({ monthData, selectedDate, onDateSelect, bengaliMonthIndex, bengaliYear, onMonthChange, onYearChange }: MonthlyCalendarProps) {
  if (monthData.length === 0) {
    return null;
  }
  
  const bengaliMonth = BENGALI_MONTHS[bengaliMonthIndex];
  const bengaliYearBN = toBengaliNumber(bengaliYear);

  const getWeekdayIndex = (weekday: string) => {
    return BENGALI_WEEKDAYS.findIndex(d => d === weekday);
  };
  
  const startingDayOfWeek = getWeekdayIndex(monthData[0].bengaliWeekday);
  const emptyDays = Array.from({ length: startingDayOfWeek < 0 ? 0 : startingDayOfWeek });
  
  const years = Array.from({ length: 21 }, (_, i) => bengaliYear - 10 + i);

  const handlePrevMonth = () => {
    if (bengaliMonthIndex === 0) {
      onYearChange(bengaliYear - 1);
      onMonthChange(11);
    } else {
      onMonthChange(bengaliMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (bengaliMonthIndex === 11) {
      onYearChange(bengaliYear + 1);
      onMonthChange(0);
    } else {
      onMonthChange(bengaliMonthIndex + 1);
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg bg-card">
      <CardHeader className="text-center bg-primary/10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Select value={String(bengaliMonthIndex)} onValueChange={(value) => onMonthChange(Number(value))}>
              <SelectTrigger className="w-[150px] text-xl font-headline text-primary border-none focus:ring-0">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {BENGALI_MONTHS.map((month, index) => (
                  <SelectItem key={month} value={String(index)}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={String(bengaliYear)} onValueChange={(value) => onYearChange(Number(value))}>
              <SelectTrigger className="w-[120px] text-xl font-headline text-primary border-none focus:ring-0">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={String(year)}>{toBengaliNumber(year)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
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
              aria-pressed={selectedDate.bengaliDate === date.bengaliDate && selectedDate.bengaliMonth === date.bengaliMonth}
              className={cn(
                "relative flex flex-col items-center justify-start p-1.5 border-2 rounded-lg transition-all duration-200 text-left h-16 md:h-24 overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:z-10",
                {
                  "bg-accent text-accent-foreground border-accent": selectedDate.bengaliDate === date.bengaliDate && selectedDate.bengaliMonth === date.bengaliMonth,
                  "bg-primary/20 border-primary text-primary-foreground": date.isToday,
                  "hover:bg-primary/10 dark:hover:bg-primary/20 border-transparent": !(selectedDate.bengaliDate === date.bengaliDate && selectedDate.bengaliMonth === date.bengaliMonth) && !date.isToday,
                }
              )}
            >
              <span className={cn("text-lg md:text-xl font-headline", {"text-primary-foreground": date.isToday, "text-primary": !date.isToday})}>{toBengaliNumber(date.bengaliDate)}</span>
              <span className={cn("text-xs", {"text-muted-foreground": !date.isToday, "text-primary-foreground/80": date.isToday})}>{date.gregorianDate}</span>
              <div className="absolute bottom-1 right-1 flex flex-col items-end gap-1 md:bottom-2 md:right-2">
                {date.events.some(e => e.includes('পূর্ণিমা') || e.includes('অমাবস্যা') || e.includes('একাদশী')) &&
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" title="বিশেষ তিথি"></div>
                }
                {date.events.some(e => !e.includes('পূর্ণিমা') && !e.includes('অমাবস্যা') && !e.includes('একাদশী') && e.length > 0) &&
                    <div className={cn("w-1.5 h-1.5 rounded-full", { "bg-primary-foreground": date.isToday, "bg-primary": !date.isToday})} title="উৎসব"></div>
                }
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
