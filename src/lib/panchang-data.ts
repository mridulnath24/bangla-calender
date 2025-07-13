import type { PanchangDate } from './types';
import { BENGALI_WEEKDAYS } from './bengali-helpers';

// Sample data for Ashwin 1431 (Approx. Sep-Oct 2024)
const generateMonthData = (): PanchangDate[] => {
  const startDate = new Date(2024, 8, 18); // 18th September 2024 is 1st Ashwin 1431
  const tithis = ['প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী'];
  const nakshatras = ['পূর্ব ভাদ্রপদ', 'উত্তর ভাদ্রপদ', 'রেবতী', 'অশ্বিনী', ' ভরণী', 'কৃত্তিকা', 'রোহিণী', 'মৃগশিরা', 'আর্দ্রা', 'পুনর্বসু', 'পুষ্যা', 'অশ্লেষা', 'মঘা', 'পূর্ব ফাল্গুনী', 'উত্তর ফাল্গুনী', 'হস্তা', 'চিত্রা', 'স্বাতী', 'বিশাখা', 'অনুরাধা', 'জ্যেষ্ঠা', 'মূলা', 'পূর্বাষাঢ়া', 'উত্তরাষাঢ়া', 'শ্রবণা', 'ধনিষ্ঠা', 'শতভিষা'];
  const today = new Date();

  const generatedData: PanchangDate[] = Array.from({ length: 30 }, (_, i) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const isToday = currentDate.getDate() === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear();

    let moonPhase: PanchangDate['moonPhase'] = i < 15 ? 'কৃষ্ণপক্ষ' : 'শুক্লপক্ষ';
    let tithiName = '';

    if (i === 0) {
      tithiName = 'পূর্ণিমা';
      moonPhase = 'পূর্ণিমা';
    } else if (i === 14) {
      tithiName = 'অমাবস্যা';
      moonPhase = 'অমাবস্যা';
    } else if (i > 14) {
      tithiName = tithis[i - 15];
    } else {
      tithiName = tithis[i - 1];
    }

    let events: string[] = [];
    if (tithiName === 'একাদশী') events.push('একাদশী');
    if (moonPhase === 'পূর্ণিমা') events.push('পূর্ণিমা');
    if (moonPhase === 'অমাবস্যা') events.push('অমাবস্যা');
    if (i === 0) events.push('বিশ্বকর্মা পূজা');
    if (i === 14) events.push('মহালয়া');
    if (i >= 15 && i <= 19) {
      const pujaDays = ['ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী'];
      events.push(`দুর্গাপূজা - ${pujaDays[i - 15]}`);
    }
    if (i === 24) events.push('লক্ষ্মী পূজা');


    return {
      gregorianDate: currentDate.getDate(),
      gregorianMonth: currentDate.getMonth(),
      gregorianYear: currentDate.getFullYear(),
      bengaliDate: i + 1,
      bengaliMonth: 'আশ্বিন',
      bengaliYear: 1431,
      bengaliWeekday: BENGALI_WEEKDAYS[currentDate.getDay()],
      tithi: { name: tithiName, endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
      nakshatra: { name: nakshatras[i % 27], endTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random()*60)).padStart(2,'0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}` },
      moonPhase: moonPhase,
      events: events,
      isToday: isToday,
    };
  });

  return generatedData;
};

const monthData = generateMonthData();

export const getMonthData = (): PanchangDate[] => {
    // In a real app, this would fetch from an API or calculate based on the current date.
    // For now, we return our static data and update the `isToday` flag.
    const today = new Date();
    return monthData.map(d => ({
        ...d,
        isToday: d.gregorianDate === today.getDate() &&
                 d.gregorianMonth === today.getMonth() &&
                 d.gregorianYear === today.getFullYear(),
    }));
};
