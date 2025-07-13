import type { PanchangDate, TodayInfo } from './types';
import { BENGALI_WEEKDAYS, BENGALI_MONTHS } from './bengali-helpers';

// Helper function to check if a year is a leap year
const isLeap = (year: number) => new Date(year, 1, 29).getDate() === 29;

// Map Bengali month index to approximate Gregorian start date
const BENGALI_MONTH_GREGORIAN_START = [
  { month: 3, day: 14 }, // Baishakh (starts around April 14/15)
  { month: 4, day: 15 }, // Jaistha
  { month: 5, day: 15 }, // Ashar
  { month: 6, day: 16 }, // Sraban
  { month: 7, day: 16 }, // Bhadra
  { month: 8, day: 17 }, // Ashwin
  { month: 9, day: 17 }, // Kartik
  { month: 10, day: 16 }, // Agrahyan
  { month: 11, day: 15 }, // Poush
  { month: 0, day: 15 }, // Magh (starts next Gregorian year)
  { month: 1, day: 13 }, // Falgun
  { month: 2, day: 14 }, // Chaitra
];

// Number of days in each Bengali month
const BENGALI_MONTH_DAYS = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];


const generateMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
  // Determine the Gregorian year for the start of the Bengali month
  // Bengali year starts mid-April, so for months Magh-Chaitra, it's the next Gregorian year
  let gregorianYear = bengaliYear + 593;
  if (bengaliMonthIndex >= 9) {
    gregorianYear += 1;
  }
  
  const start = BENGALI_MONTH_GREGORIAN_START[bengaliMonthIndex];
  
  // Adjust Falgun for leap years
  const daysInFalgun = isLeap(gregorianYear) ? 31 : 30;
  const monthLengths = [...BENGALI_MONTH_DAYS];
  monthLengths[10] = daysInFalgun;
  
  const daysInMonth = monthLengths[bengaliMonthIndex];

  // This is an approximation. A real panchang requires complex astronomical calculations.
  const startDate = new Date(Date.UTC(gregorianYear, start.month, start.day));
  
  const tithis = ['প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী'];
  const nakshatras = ['পূর্ব ভাদ্রপদ', 'উত্তর ভাদ্রপদ', 'রেবতী', 'অশ্বিনী', ' ভরণী', 'কৃত্তিকা', 'রোহিণী', 'মৃগশিরা', 'আর্দ্রা', 'পুনর্বসু', 'পুষ্যা', 'অশ্লেষা', 'মঘা', 'পূর্ব ফাল্গুনী', 'উত্তর ফাল্গুনী', 'হস্তা', 'চিত্রা', 'স্বাতী', 'বিশাখা', 'অনুরাধা', 'জ্যেষ্ঠা', 'মূলা', 'পূর্বাষাঢ়া', 'উত্তরাষাঢ়া', 'শ্রবণা', 'ধনিষ্ঠা', 'শতভিষা'];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Normalize today's date to UTC

  const generatedData: PanchangDate[] = Array.from({ length: daysInMonth }, (_, i) => {
    const currentDate = new Date(startDate);
    currentDate.setUTCDate(startDate.getUTCDate() + i);

    const isToday = currentDate.getTime() === today.getTime();

    // Simplified moon phase and tithi calculation
    const dayOfMonth = i + 1;
    let moonPhase: PanchangDate['moonPhase'] = dayOfMonth <= 15 ? 'কৃষ্ণপক্ষ' : 'শুক্লপক্ষ';
    let tithiName = '';
    
    // Approximating Purnima and Amavasya
    const purnimaDay = Math.floor(daysInMonth / 2);
    const amavasyaDay = daysInMonth;

    if (dayOfMonth === 1) {
      tithiName = tithis[0] // Pratipad
    } else if (dayOfMonth === purnimaDay) {
        tithiName = 'পূর্ণিমা';
        moonPhase = 'পূর্ণিমা';
    } else if (dayOfMonth === amavasyaDay) {
        tithiName = 'অমাবস্যা';
        moonPhase = 'অমাবস্যা';
    } else if (dayOfMonth > purnimaDay) {
      // Shukla Paksha
      tithiName = tithis[(dayOfMonth - purnimaDay -1) % 14];
    } else {
      // Krishna Paksha
      tithiName = tithis[(dayOfMonth-1) % 14];
    }

    let events: string[] = [];
    if (tithiName === 'একাদশী') events.push('একাদশী');
    if (moonPhase === 'পূর্ণিমা') events.push('পূর্ণিমা');
    if (moonPhase === 'অমাবস্যা') events.push('অমাবস্যা');

    // Sample Events (for demonstration)
    if (bengaliMonthIndex === 5) { // Ashwin
        if (i === 0) events.push('বিশ্বকর্মা পূজা');
        if (i === 14) events.push('মহালয়া');
        if (i >= 21 && i <= 25) {
          const pujaDays = ['ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী'];
          events.push(`দুর্গাপূজা - ${pujaDays[i - 21]}`);
        }
        if (i === 30) events.push('লক্ষ্মী পূজা');
    }
     if (bengaliMonthIndex === 0 && i === 0) { // Baishakh
        events.push('নববর্ষ');
     }


    return {
      gregorianDate: currentDate.getUTCDate(),
      gregorianMonth: currentDate.getUTCMonth(),
      gregorianYear: currentDate.getUTCFullYear(),
      bengaliDate: i + 1,
      bengaliMonth: BENGALI_MONTHS[bengaliMonthIndex],
      bengaliYear: bengaliYear,
      bengaliWeekday: BENGALI_WEEKDAYS[currentDate.getUTCDay()],
      tithi: { name: tithiName, endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
      nakshatra: { name: nakshatras[(currentDate.getUTCDate() + currentDate.getUTCMonth()*30) % 27], endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
      moonPhase: moonPhase,
      events: events,
      isToday: isToday,
    };
  });

  return generatedData;
};

export function getTodaysBengaliDate(): TodayInfo | null {
  const today = new Date();
  const gregorianYear = today.getFullYear();
  const gregorianMonth = today.getMonth();
  const gregorianDate = today.getDate();

  // Find which Bengali month it is
  for (let i = 0; i < BENGALI_MONTHS.length; i++) {
    const monthData = generateMonthData(gregorianYear - 593, i);
    const todayData = monthData.find(d => 
      d.gregorianYear === gregorianYear &&
      d.gregorianMonth === gregorianMonth &&
      d.gregorianDate === gregorianDate
    );
    if (todayData) {
      return {
        bengaliYear: todayData.bengaliYear,
        bengaliMonthIndex: i,
        bengaliDate: todayData.bengaliDate,
      }
    }
  }

  // Check previous bengali year if not found (for early months of gregorian year)
   for (let i = 0; i < BENGALI_MONTHS.length; i++) {
    const monthData = generateMonthData(gregorianYear - 594, i);
    const todayData = monthData.find(d => 
      d.gregorianYear === gregorianYear &&
      d.gregorianMonth === gregorianMonth &&
      d.gregorianDate === gregorianDate
    );
    if (todayData) {
      return {
        bengaliYear: todayData.bengaliYear,
        bengaliMonthIndex: i,
        bengaliDate: todayData.bengaliDate,
      }
    }
  }

  return null; // Should not happen with the logic above
}


export const getMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    return generateMonthData(bengaliYear, bengaliMonthIndex);
};
