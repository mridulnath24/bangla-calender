"use client";

import type { PanchangDate } from '@/lib/types';
import { BENGALI_WEEKDAYS, BENGALI_WEEKDAYS_SHORT, toBengaliNumber, BENGALI_MONTHS } from '@/lib/bengali-helpers';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    return (
        <Card className="overflow-hidden shadow-lg bg-card">
             <CardHeader className="text-center bg-primary/10">
                <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => {}}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="text-xl font-headline text-primary">No Data Available</div>
                <Button variant="ghost" size="icon" onClick={() => {}}>
                    <ChevronRight className="h-6 w-6" />
                </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 text-center text-muted-foreground">
                Calendar data for this month is not available yet.
            </CardContent>
        </Card>
    );
  }
  
  const getWeekdayIndex = (weekday: string) => {
    return BENGALI_WEEKDAYS.findIndex(d => d === weekday);
  };
  
  const startingDayOfWeek = getWeekdayIndex(monthData[0].bengaliWeekday);
  const emptyDays = Array.from({ length: startingDayOfWeek < 0 ? 0 : startingDayOfWeek });
  
  const years = Array.from({ length: 41 }, (_, i) => 1410 + i);

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
  
  const isSameDay = (d1: PanchangDate, d2: PanchangDate) => {
    return d1.bengaliDate === d2.bengaliDate &&
           d1.bengaliMonthIndex === d2.bengaliMonthIndex &&
           d1.bengaliYear === d2.bengaliYear;
  }

  return (
    <Card className="overflow-hidden shadow-lg bg-card">
      <CardHeader className="text-center bg-primary/10 p-2 md:p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth} aria-label="Previous Month">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Select value={String(bengaliMonthIndex)} onValueChange={(value) => onMonthChange(Number(value))}>
              <SelectTrigger className="w-[140px] text-lg md:text-xl font-headline text-primary border-none focus:ring-0 bg-transparent">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {BENGALI_MONTHS.map((month, index) => (
                  <SelectItem key={month} value={String(index)}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={String(bengaliYear)} onValueChange={(value) => onYearChange(Number(value))}>
              <SelectTrigger className="w-[120px] text-lg md:text-xl font-headline text-primary border-none focus:ring-0 bg-transparent">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={String(year)}>{toBengaliNumber(year)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth} aria-label="Next Month">
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
              key={`${date.bengaliYear}-${date.bengaliMonthIndex}-${date.bengaliDate}`}
              onClick={() => onDateSelect(date)}
              aria-pressed={isSameDay(selectedDate, date)}
              className={cn(
                "relative flex flex-col items-center justify-start p-1.5 border-2 rounded-lg transition-all duration-200 text-left h-16 md:h-24 overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:z-10",
                {
                  "bg-accent text-accent-foreground border-accent animate-pop-in": isSameDay(selectedDate, date),
                  "border-primary text-primary-foreground bg-primary/80": date.isToday,
                  "hover:bg-primary/10 dark:hover:bg-primary/20 border-transparent": !isSameDay(selectedDate, date) && !date.isToday,
                }
              )}
            >
              <span className={cn("text-lg md:text-xl font-headline", {
                  "text-primary-foreground/90": date.isToday && !isSameDay(selectedDate, date),
                  "text-accent-foreground": isSameDay(selectedDate, date),
                  "text-foreground": !isSameDay(selectedDate, date)
              })}>{toBengaliNumber(date.bengaliDate)}</span>
              <span className={cn("text-xs", {
                  "text-muted-foreground": !date.isToday || isSameDay(selectedDate, date),
                   "text-primary-foreground/70": date.isToday && !isSameDay(selectedDate, date),
                  "text-accent-foreground/80": isSameDay(selectedDate, date)
              })}>{toBengaliNumber(date.gregorianDate)}</span>
              <div className="absolute bottom-1 right-1 flex flex-col items-end gap-1 md:bottom-2 md:right-2">
                 {date.events.some(e => e.includes('পূর্ণিমা') || e.includes('অমাবস্যা') || e.includes('একাদশী')) &&
                    <div className={cn("w-1.5 h-1.5 rounded-full", { "bg-accent-foreground/50": isSameDay(selectedDate, date), "bg-accent": !isSameDay(selectedDate, date)})} title="বিশেষ তিথি"></div>
                }
                {date.events.some(e => !e.includes('পূর্ণিমা') && !e.includes('অমাবস্যা') && !e.includes('একাদশী') && e.length > 0) &&
                    <div className={cn("w-1.5 h-1.5 rounded-full", { "bg-primary-foreground": date.isToday, "bg-primary": !date.isToday, "bg-accent-foreground/80": isSameDay(selectedDate,date)})} title="উৎসব"></div>
                }
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
