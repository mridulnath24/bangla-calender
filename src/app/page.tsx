"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import DateDetails from '@/components/DateDetails';
import { getMonthData } from '@/lib/panchang-data';
import type { PanchangDate } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
    <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95">
            <div className="container flex h-16 items-center justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </header>
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-10 w-24" />
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-32" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                            <Skeleton className="h-10 w-24" />
                        </div>
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Skeleton className="h-[500px] w-full" />
                </div>
            </div>
        </main>
    </div>
);


export default function Home() {
  const [currentBengaliMonthIndex, setCurrentBengaliMonthIndex] = useState(0); 
  const [currentBengaliYear, setCurrentBengaliYear] = useState(1431);
  const [monthData, setMonthData] = useState<PanchangDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<PanchangDate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    const today = new Date();
    // This is an approximation. A real app would have a robust bengali date converter.
    // For now, we will just use the current gregorian month and year for demonstration.
    const year = today.getFullYear() - 593;
    const month = today.getMonth(); 
    
    // Set the initial view to Aashar 1432 for consistency with the design
    setCurrentBengaliMonthIndex(2);
    setCurrentBengaliYear(1432);
    
    // In a real scenario, you'd find today's bengali date and select it
    // For this demo, we select a specific date from our hardcoded month.
    const data = getMonthData(1432, 2);
    setMonthData(data);
    const specificDate = data.find(d => d.bengaliDate === 28);
    if (specificDate) {
      setSelectedDate(specificDate);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const data = getMonthData(currentBengaliYear, currentBengaliMonthIndex);
    setMonthData(data);
    
    if (data.length > 0) {
        // if the selected date is not in the new month, select the first day
        const isSelectedDateInNewMonth = data.some(d => d.gregorianDate === selectedDate?.gregorianDate && d.gregorianMonth === selectedDate?.gregorianMonth);
        if (!isSelectedDateInNewMonth) {
            setSelectedDate(data[0]);
        }
    }
    
    setIsLoading(false);
  }, [currentBengaliYear, currentBengaliMonthIndex, selectedDate]);

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
    return <LoadingSkeleton />;
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
            <SheetContent side="bottom" className="h-[90vh] p-0 border-t-2" >
                {selectedDate && <DateDetails date={selectedDate} onClose={() => setIsDetailsOpen(false)} />}
            </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
