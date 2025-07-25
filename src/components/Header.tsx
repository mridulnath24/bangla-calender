
"use client";

import { useState, useEffect } from 'react';
import type { PanchangDate } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { BengaliCalendarIcon } from '@/components/BengaliCalendarIcon';
import { Clock } from 'lucide-react';

interface HeaderProps {
  today: PanchangDate | undefined;
}

const formatGregorianDateInBengali = (date: Date): string => {
    const day = toBengaliNumber(date.getDate());
    const year = toBengaliNumber(date.getFullYear());
    const monthNames = [
        "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}, ${year}`;
}


export default function Header({ today }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setCurrentTime(new Date());
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
            <BengaliCalendarIcon />
            <h1 className="text-xl md:text-2xl font-bold font-headline text-primary">বাংলা ক্যালেন্ডার</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex flex-col items-end">
                    {today && (
                        <p className="font-semibold text-primary">{`${toBengaliNumber(today.bengaliDate)} ${today.bengaliMonth}, ${toBengaliNumber(today.bengaliYear)}`}</p>
                    )}
                    {currentTime && <p className="text-muted-foreground">{formatGregorianDateInBengali(currentTime)}</p>}
                </div>
                {currentTime && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-xs">{currentTime.toLocaleTimeString('en-US')}</span>
                    </div>
                )}
            </div>
           <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
