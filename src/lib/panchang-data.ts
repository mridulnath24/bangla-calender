import type { PanchangDate, TodayInfo } from './types';
import { BENGALI_WEEKDAYS, BENGALI_MONTHS } from './bengali-helpers';

// The Bengali year is 593 years behind the Gregorian year.
const BENGALI_YEAR_OFFSET = 593;
// Pohela Boishakh is on April 14th (or 15th in a leap year before it).
const POHELA_BOISHAKH_GREGORIAN_MONTH = 3; // April (0-indexed)
const POHELA_BOISHAKH_GREGORIAN_DATE = 14;

// The official revised Bengali calendar used in Bangladesh has fixed month lengths.
// This is a simpler system.
// Baishakh to Bhadra are 31 days. Ashwin to Chaitra are 30 days.
// Falgun has 31 days in a leap year.
const BENGALI_MONTH_DAYS_REGULAR = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
const BENGALI_MONTH_DAYS_LEAP =   [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 31, 30];

// Helper to check if a Gregorian year is a leap year.
const isGregorianLeap = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Converts a Gregorian date to a Bengali date based on the revised (Bangladesh) system.
const convertGregorianToBengali = (gregorianDate: Date): { year: number, month: number, day: number } => {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth(); // 0-indexed
    const gDay = gregorianDate.getDate();

    let bYear = gYear - BENGALI_YEAR_OFFSET;
    
    // Determine the Gregorian date of Pohela Boishakh for the current Gregorian year.
    const pohelaBoishakh = new Date(gYear, POHELA_BOISHAKH_GREGORIAN_MONTH, POHELA_BOISHAKH_GREGORIAN_DATE);

    if (gregorianDate < pohelaBoishakh) {
        bYear--;
    }
    
    // Calculate days passed since Pohela Boishakh of the current Bengali year.
    const bNewYearDate = new Date(bYear + BENGALI_YEAR_OFFSET, POHELA_BOISHAKH_GREGORIAN_MONTH, POHELA_BOISHAKH_GREGORIAN_DATE);
    
    // Calculate difference in days. Add 1 to be inclusive of the start day.
    const diffTime = gregorianDate.getTime() - bNewYearDate.getTime();
    let daysSinceBoishakh = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    const bengaliMonthDays = isGregorianLeap(bYear + BENGALI_YEAR_OFFSET + 1) ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;
    
    let bMonth = 0;
    for(let i=0; i < bengaliMonthDays.length; i++) {
        if(daysSinceBoishakh < bengaliMonthDays[i]) {
            bMonth = i;
            break;
        }
        daysSinceBoishakh -= bengaliMonthDays[i];
    }
    
    const bDay = daysSinceBoishakh + 1;

    return { year: bYear, month: bMonth, day: bDay };
}

const convertBengaliToGregorian = (bengaliYear: number, bengaliMonthIndex: number, bengaliDay: number): Date => {
    const pohelaBoishakhGregorianYear = bengaliYear + BENGALI_YEAR_OFFSET;

    const isLeap = isGregorianLeap(pohelaBoishakhGregorianYear + 1);
    const bengaliMonthDays = isLeap ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;

    let daysPassed = bengaliDay - 1;
    for (let i = 0; i < bengaliMonthIndex; i++) {
        daysPassed += bengaliMonthDays[i];
    }

    const gregorianDate = new Date(pohelaBoishakhGregorianYear, POHELA_BOISHAKH_GREGORIAN_MONTH, POHELA_BOISHAKH_GREGORIAN_DATE);
    gregorianDate.setDate(gregorianDate.getDate() + daysPassed);

    return gregorianDate;
};


const generateMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    const isLeap = isGregorianLeap(bengaliYear + BENGALI_YEAR_OFFSET + 1);
    const monthLengths = isLeap ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;
    const daysInMonth = monthLengths[bengaliMonthIndex];

    const tithis = ['প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী'];
    const nakshatras = ['পূর্ব ভাদ্রপদ', 'উত্তর ভাদ্রপদ', 'রেবতী', 'অশ্বিনী', ' ভরণী', 'কৃত্তিকা', 'রোহিণী', 'মৃগশিরা', 'আর্দ্রা', 'পুনর্বসু', 'পুষ্যা', 'অশ্লেষা', 'মঘা', 'পূর্ব ফাল্গুনী', 'উত্তর ফাল্গুনী', 'হস্তা', 'চিত্রা', 'স্বাতী', 'বিশাখা', 'অনুরাধা', 'জ্যেষ্ঠা', 'মূলা', 'পূর্বাষাঢ়া', 'উত্তরাষাঢ়া', 'শ্রবণা', 'ধনিষ্ঠা', 'শতভিষা'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const generatedData: PanchangDate[] = Array.from({ length: daysInMonth }, (_, i) => {
        const bengaliDate = i + 1;
        const currentDate = convertBengaliToGregorian(bengaliYear, bengaliMonthIndex, bengaliDate);
        currentDate.setHours(0, 0, 0, 0);

        const isToday = currentDate.getTime() === today.getTime();

        // Simplified moon phase and tithi calculation
        const dayOfMonth = i + 1;
        let moonPhase: PanchangDate['moonPhase'] = dayOfMonth <= 15 ? 'কৃষ্ণপক্ষ' : 'শুক্লপক্ষ';
        let tithiName = '';
        
        const purnimaDay = 15;
        const amavasyaDay = daysInMonth;

        if (dayOfMonth === purnimaDay) {
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
        if (bengaliMonthIndex === 5 && bengaliYear === 1431) { // Ashwin 1431
            if (i + 1 === 1) events.push('বিশ্বকর্মা পূজা');
            if (i + 1 === 15) events.push('মহালয়া');
            if (i + 1 >= 22 && i + 1 <= 26) {
                const pujaDays = ['ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী'];
                events.push(`দুর্গাপূজা - ${pujaDays[i - 21]}`);
            }
            if (i + 1 === 30) events.push('লক্ষ্মী পূজা');
        }
        if (bengaliMonthIndex === 0 && i === 0) { // Baishakh
            events.push('নববর্ষ');
        }


        return {
            gregorianDate: currentDate.getDate(),
            gregorianMonth: currentDate.getMonth(),
            gregorianYear: currentDate.getFullYear(),
            bengaliDate: bengaliDate,
            bengaliMonth: BENGALI_MONTHS[bengaliMonthIndex],
            bengaliMonthIndex: bengaliMonthIndex,
            bengaliYear: bengaliYear,
            bengaliWeekday: BENGALI_WEEKDAYS[currentDate.getDay()],
            tithi: { name: tithiName, endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
            nakshatra: { name: nakshatras[(currentDate.getDate() + currentDate.getMonth()*30) % 27], endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
            moonPhase: moonPhase,
            events: events,
            isToday: isToday,
        };
    });

    return generatedData;
};

export function getTodaysBengaliDate(): TodayInfo | null {
  const today = new Date();
  const bengaliInfo = convertGregorianToBengali(today);

  return {
    bengaliYear: bengaliInfo.year,
    bengaliMonthIndex: bengaliInfo.month,
    bengaliDate: bengaliInfo.day,
  }
}

export const getMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    return generateMonthData(bengaliYear, bengaliMonthIndex);
};
