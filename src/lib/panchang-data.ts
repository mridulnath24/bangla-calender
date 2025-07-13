import type { PanchangDate, TodayInfo } from './types';
import { BENGALI_WEEKDAYS, BENGALI_MONTHS } from './bengali-helpers';

// Revised Bengali Calendar Calculation Logic

// The Bengali calendar has a fixed number of days in each month.
// Baishakh to Bhadra are 31 days, and Ashwin to Chaitra are 30 days.
// Falgun has 31 days in a leap year.
const BENGALI_MONTH_DAYS_REGULAR = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
const BENGALI_MONTH_DAYS_LEAP =   [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 31, 30];

// Bengali new year (Pohela Boishakh) is on April 14th.
// The Bengali year is 593 years behind the Gregorian year after Pohela Boishakh.
const BENGALI_YEAR_OFFSET = 593;

// Helper to check if a Gregorian year is a leap year.
const isGregorianLeap = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Helper to get number of days in a Gregorian month.
const daysInGregorianMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

const convertGregorianToBengali = (gregorianDate: Date): { year: number, month: number, day: number } => {
    const gd = gregorianDate.getDate();
    const gm = gregorianDate.getMonth() + 1; // 1-indexed
    const gy = gregorianDate.getFullYear();

    // Bengali Year
    let bengaliYear = gy - BENGALI_YEAR_OFFSET;
    if (gm < 4 || (gm === 4 && gd < 14)) {
        bengaliYear--;
    }

    const bengaliMonthDays = isGregorianLeap(gy) ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;

    // Calculate days passed in the Gregorian year until the given date.
    let dayOfYear = 0;
    for (let m = 0; m < gm - 1; m++) {
        dayOfYear += daysInGregorianMonth(gy, m);
    }
    dayOfYear += gd;

    // Pohela Boishakh is usually on April 14th. This is the 104th day of a regular year and 105th of a leap year.
    const pohelaBoishakhDayOfYear = isGregorianLeap(gy) ? 105 : 104;

    let bengaliDayOfYear;
    if (dayOfYear >= pohelaBoishakhDayOfYear) {
        bengaliDayOfYear = dayOfYear - pohelaBoishakhDayOfYear + 1;
    } else {
        // Days from previous Gregorian year's Pohela Boishakh
        const prevYearDays = isGregorianLeap(gy - 1) ? 366 : 365;
        const prevPohelaBoishakhDayOfYear = isGregorianLeap(gy - 1) ? 105 : 104;
        bengaliDayOfYear = dayOfYear + (prevYearDays - prevPohelaBoishakhDayOfYear + 1);
    }
    
    let bengaliMonth = 0;
    let bengaliDate = bengaliDayOfYear;

    for (let i = 0; i < bengaliMonthDays.length; i++) {
        const daysInMonth = bengaliMonthDays[i];
        if (bengaliDate <= daysInMonth) {
            bengaliMonth = i;
            break;
        }
        bengaliDate -= daysInMonth;
    }

    return { year: bengaliYear, month: bengaliMonth, day: bengaliDate };
}

const convertBengaliToGregorian = (bengaliYear: number, bengaliMonthIndex: number, bengaliDay: number): Date => {
    let gregorianYear = bengaliYear + BENGALI_YEAR_OFFSET;
    const pohelaBoishakhGregorianYear = gregorianYear;

    const bengaliMonthDays = isGregorianLeap(pohelaBoishakhGregorianYear) ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;

    let daysInBengaliYear = 0;
    for (let i = 0; i < bengaliMonthIndex; i++) {
        daysInBengaliYear += bengaliMonthDays[i];
    }
    daysInBengaliYear += bengaliDay;

    const pohelaBoishakhDayOfYear = isGregorianLeap(pohelaBoishakhGregorianYear) ? 105 : 104;
    
    let gregorianDayOfYear = daysInBengaliYear + pohelaBoishakhDayOfYear - 1;
    
    if (gregorianDayOfYear > (isGregorianLeap(gregorianYear) ? 366 : 365)) {
      gregorianDayOfYear -= (isGregorianLeap(gregorianYear) ? 366 : 365);
      gregorianYear++;
    }

    const gregorianDate = new Date(gregorianYear, 0, gregorianDayOfYear);
    return gregorianDate;
};


const generateMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    const pohelaBoishakhGregorianYear = bengaliYear + BENGALI_YEAR_OFFSET;
    const monthLengths = isGregorianLeap(pohelaBoishakhGregorianYear) ? BENGALI_MONTH_DAYS_LEAP : BENGALI_MONTH_DAYS_REGULAR;
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
