import type { PanchangDate, TodayInfo } from './types';
import { BENGALI_WEEKDAYS, BENGALI_MONTHS } from './bengali-helpers';

// Hardcoded data for Aashar 1432 (June/July 2025) based on the provided image.
const aashar1432Data: Omit<PanchangDate, 'isToday' | 'bengaliWeekday' | 'bengaliMonthIndex' | 'bengaliYear' | 'bengaliMonth'>[] = [
  { gregorianDate: 16, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 1, tithi: { name: 'পঞ্চমী', endTime: '' }, nakshatra: { name: 'ধনিষ্ঠা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 17, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 2, tithi: { name: 'ষষ্ঠী', endTime: '' }, nakshatra: { name: 'শতভিষা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 18, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 3, tithi: { name: 'সপ্তমী', endTime: '' }, nakshatra: { name: 'পূর্ব ভাদ্রপদ', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 19, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 4, tithi: { name: 'অষ্টমী', endTime: '' }, nakshatra: { name: 'উত্তর ভাদ্রপদ', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 20, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 5, tithi: { name: 'নবমী', endTime: '' }, nakshatra: { name: 'রেবতী', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 21, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 6, tithi: { name: 'দশমী', endTime: '' }, nakshatra: { name: 'অশ্বিনী', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 22, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 7, tithi: { name: 'একাদশী', endTime: '' }, nakshatra: { name: 'দ্বিজা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 23, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 8, tithi: { name: 'দ্বাদশী', endTime: '' }, nakshatra: { name: 'ভরণী', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 24, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 9, tithi: { name: 'ত্রয়োদশী', endTime: '' }, nakshatra: { name: 'কৃত্তিকা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 25, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 10, tithi: { name: 'চতুর্দশী', endTime: '' }, nakshatra: { name: 'রোহিণী', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 26, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 11, tithi: { name: 'অমাবস্যা', endTime: '' }, nakshatra: { name: 'মৃগশিরা', endTime: '' }, moonPhase: 'অমাবস্যা', events: ['অমাবস্যা'] },
  { gregorianDate: 27, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 12, tithi: { name: 'প্রতিপদ', endTime: '' }, nakshatra: { name: 'আর্দ্রা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 28, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 13, tithi: { name: 'দ্বিতীয়া', endTime: '' }, nakshatra: { name: 'পুনর্বসু', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: ['রথযাত্রা'] },
  { gregorianDate: 29, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 14, tithi: { name: 'তৃতীয়া', endTime: '' }, nakshatra: { name: 'পুষ্যা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 30, gregorianMonth: 5, gregorianYear: 2025, bengaliDate: 15, tithi: { name: 'চতুর্থী', endTime: '' }, nakshatra: { name: 'অশ্লেষা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 1, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 16, tithi: { name: 'পঞ্চমী', endTime: '' }, nakshatra: { name: 'মঘা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 2, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 17, tithi: { name: 'ষষ্ঠী', endTime: '' }, nakshatra: { name: 'পূর্ব ফাল্গুনী', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 3, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 18, tithi: { name: 'সপ্তমী', endTime: '' }, nakshatra: { name: 'উত্তর ফাল্গুনী', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 4, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 19, tithi: { name: 'অষ্টমী', endTime: '' }, nakshatra: { name: 'হস্তা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 5, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 20, tithi: { name: 'নবমী', endTime: '' }, nakshatra: { name: 'চিত্রা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 6, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 21, tithi: { name: 'দশমী', endTime: '' }, nakshatra: { name: 'স্বাতী', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 7, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 22, tithi: { name: 'একাদশী', endTime: '' }, nakshatra: { name: 'বিশাখা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: ['শয়ন একাদশী', 'একাদশী'] },
  { gregorianDate: 8, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 23, tithi: { name: 'দ্বাদশী', endTime: '' }, nakshatra: { name: 'অনুরাধা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 9, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 24, tithi: { name: 'ত্রয়োদশী', endTime: '' }, nakshatra: { name: 'জ্যেষ্ঠা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 10, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 25, tithi: { name: 'চতুর্দশী', endTime: '' }, nakshatra: { name: 'মূলা', endTime: '' }, moonPhase: 'শুক্লপক্ষ', events: [] },
  { gregorianDate: 11, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 26, tithi: { name: 'পূর্ণিমা', endTime: '' }, nakshatra: { name: 'পূর্বাষাঢ়া', endTime: '' }, moonPhase: 'পূর্ণিমা', events: ['পূর্ণিমা'] },
  { gregorianDate: 12, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 27, tithi: { name: 'প্রতিপদ', endTime: '' }, nakshatra: { name: 'উত্তরাষাঢ়া', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 13, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 28, tithi: { name: 'দ্বিতীয়া', endTime: '' }, nakshatra: { name: 'শ্রবণা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: ['কবি ভানু ভক্তের জন্মবার্ষিকী'] },
  { gregorianDate: 14, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 29, tithi: { name: 'তৃতীয়া', endTime: '' }, nakshatra: { name: 'ধনিষ্ঠা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 15, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 30, tithi: { name: 'চতুর্থী', endTime: '' }, nakshatra: { name: 'শতভিষা', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
  { gregorianDate: 16, gregorianMonth: 6, gregorianYear: 2025, bengaliDate: 31, tithi: { name: 'পঞ্চমী', endTime: '' }, nakshatra: { name: 'পূর্ব ভাদ্রপদ', endTime: '' }, moonPhase: 'কৃষ্ণপক্ষ', events: [] },
];

const generateMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    // For now, we only return data for Aashar 1432
    if (bengaliYear !== 1432 || bengaliMonthIndex !== 2) {
        const BENGALI_MONTH_DAYS_REGULAR = [31, 31, 32, 31, 31, 30, 30, 30, 30, 30, 30, 30];
        const daysInMonth = BENGALI_MONTH_DAYS_REGULAR[bengaliMonthIndex] || 30;
         return Array.from({ length: daysInMonth }, (_, i) => {
            const bengaliDate = i + 1;
            const gregorianDate = new Date(bengaliYear-593, bengaliMonthIndex, bengaliDate); // Approximation
            return {
                gregorianDate: gregorianDate.getDate(),
                gregorianMonth: gregorianDate.getMonth(),
                gregorianYear: gregorianDate.getFullYear(),
                bengaliDate: bengaliDate,
                bengaliMonth: BENGALI_MONTHS[bengaliMonthIndex],
                bengaliMonthIndex: bengaliMonthIndex,
                bengaliYear: bengaliYear,
                bengaliWeekday: BENGALI_WEEKDAYS[gregorianDate.getDay()],
                tithi: { name: 'N/A', endTime: '' },
                nakshatra: { name: 'N/A', endTime: '' },
                moonPhase: 'কৃষ্ণপক্ষ',
                events: [],
                isToday: false,
            };
        });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return aashar1432Data.map(dayData => {
        const gregorianDateObj = new Date(dayData.gregorianYear, dayData.gregorianMonth, dayData.gregorianDate);
        gregorianDateObj.setHours(0, 0, 0, 0);

        return {
            ...dayData,
            bengaliMonth: BENGALI_MONTHS[bengaliMonthIndex],
            bengaliMonthIndex: bengaliMonthIndex,
            bengaliYear: bengaliYear,
            bengaliWeekday: BENGALI_WEEKDAYS[gregorianDateObj.getDay()],
            isToday: gregorianDateObj.getTime() === today.getTime(),
        };
    });
};

export function getTodaysBengaliDate(): TodayInfo | null {
  const today = new Date();
  // Setting a fixed date for demonstration to match the image.
  // In a real app, you would have a robust conversion function.
  const aashar28 = new Date(2025, 6, 13); // July 13, 2025
  today.setHours(0, 0, 0, 0);
  aashar28.setHours(0, 0, 0, 0);

  if (today.getTime() === aashar28.getTime()) {
      return {
          bengaliYear: 1432,
          bengaliMonthIndex: 2,
          bengaliDate: 28
      };
  }

  // Fallback to the start of Aashar 1432
  return {
    bengaliYear: 1432,
    bengaliMonthIndex: 2,
    bengaliDate: 1,
  };
}

export const getMonthData = (bengaliYear: number, bengaliMonthIndex: number): PanchangDate[] => {
    return generateMonthData(bengaliYear, bengaliMonthIndex);
};
