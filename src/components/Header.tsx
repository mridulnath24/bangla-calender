
"use client";

import { useState, useEffect } from 'react';
import type { PanchangDate } from '@/lib/types';
import { toBengaliNumber } from '@/lib/bengali-helpers';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { ShubhoDinIcon } from '@/components/ShubhoDinIcon';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface HeaderProps {
  today: PanchangDate | undefined;
}

export default function Header({ today }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US'));
    }, 1000);

    // Set initial time to avoid a blank space on first render
    setCurrentTime(new Date().toLocaleTimeString('en-US'));
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
            <ShubhoDinIcon />
            <h1 className="text-xl md:text-2xl font-bold font-headline text-primary">শুভ দিন</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex flex-col items-end">
                    {today && (
                        <p className="font-semibold text-primary">{`${toBengaliNumber(today.bengaliDate)} ${today.bengaliMonth}, ${toBengaliNumber(today.bengaliYear)}`}</p>
                    )}
                    <p className="text-muted-foreground">{format(new Date(), 'PPP', { locale: bn })}</p>
                </div>
                {currentTime && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                )}
            </div>
           <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
