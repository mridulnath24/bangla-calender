"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import DateDetails from '@/components/DateDetails';
import { getMonthData, getTodaysBengaliDate } from '@/lib/panchang-data';
import type { PanchangDate } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  // Set initial state to Aashar 1432 as per the user's image
  const [currentBengaliMonthIndex, setCurrentBengaliMonthIndex] = useState(2); 
  const [currentBengaliYear, setCurrentBengaliYear] = useState(1432);
  const [monthData, setMonthData] = useState<PanchangDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<PanchangDate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    // This effect will run once on mount to set the initial view
    const todaysBengaliDate = getTodaysBengaliDate();
    if (todaysBengaliDate) {
      setCurrentBengaliMonthIndex(todaysBengaliDate.bengaliMonthIndex);
      setCurrentBengaliYear(todaysBengaliDate.bengaliYear);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const data = getMonthData(currentBengaliYear, currentBengaliMonthIndex);
    setMonthData(data);
    
    // Select today's date if it exists in the current month's data
    const today = data.find(d => d.isToday);
    if (today) {
      setSelectedDate(today);
    } else if (selectedDate) {
      // If a date was previously selected, try to find it in the new month data
      const previouslySelected = data.find(d => 
        d.bengaliDate === selectedDate.bengaliDate && 
        d.gregorianMonth === selectedDate.gregorianMonth &&
        d.gregorianYear === selectedDate.gregorianYear
      );
      setSelectedDate(previouslySelected || data[0]);
    } else if (data.length > 0) {
      // Otherwise, default to the first day of the month
      setSelectedDate(data[0]);
    }
    setIsLoading(false);
  }, [currentBengaliYear, currentBengaliMonthIndex]);

  const handleDateSelect = (date: PanchangDate) => {
    setSelectedDate(date);
    if (isMobile) {
      setIsDetailsOpen(true);
    }
  };
  
  const handleMonthChange = (monthIndex: number) => {
    setCurrentBengaliMonthIndex(monthIndex);
  };
  
  const handleYearChange = (year: number) => {
    setCurrentBengaliYear(year);
  };

  const today = monthData.find(d => d.isToday);
  
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
              bengaliMonthIndex={currentBengaliMonthIndex}
              bengaliYear={currentBengaliYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
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
