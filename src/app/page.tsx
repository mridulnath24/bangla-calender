"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import DateDetails from '@/components/DateDetails';
import { getMonthData } from '@/lib/panchang-data';
import type { PanchangDate } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [monthData, setMonthData] = useState<PanchangDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<PanchangDate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    const data = getMonthData();
    setMonthData(data);
    const today = data.find(d => d.isToday);
    if (today) {
      setSelectedDate(today);
    } else if (data.length > 0) {
      // Select the first day of the month by default if today is not in the dataset
      setSelectedDate(data[0]);
    }
    setIsLoading(false);
  }, []);

  const handleDateSelect = (date: PanchangDate) => {
    setSelectedDate(date);
    if (isMobile) {
      setIsDetailsOpen(true);
    }
  };

  const today = monthData.find(d => d.isToday);
  const currentBengaliMonth = monthData.length > 0 ? monthData[0].bengaliMonth : '';
  const currentBengaliYear = monthData.length > 0 ? toBengaliNumber(monthData[0].bengaliYear) : '';

  if (isLoading || !selectedDate) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95">
                <div className="container flex h-16 items-center justify-between">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
                <Skeleton className="h-[600px] w-full" />
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header today={today} />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <MonthlyCalendar
              monthData={monthData}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              bengaliMonth={currentBengaliMonth}
              bengaliYear={currentBengaliYear}
            />
          </div>
          <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
            <DateDetails date={selectedDate} />
          </div>
        </div>
      </main>
      {isMobile && (
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <SheetContent side="bottom" className="h-[85vh] p-0 border-t-2">
                {selectedDate && <DateDetails date={selectedDate} />}
            </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
