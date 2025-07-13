export interface PanchangDate {
  gregorianDate: number;
  gregorianMonth: number; // 0-indexed
  gregorianYear: number;
  bengaliDate: number;
  bengaliMonth: string;
  bengaliMonthIndex: number;
  bengaliYear: number;
  bengaliWeekday: string;
  tithi: { name: string; endTime: string };
  nakshatra: { name: string; endTime: string };
  moonPhase: 'পূর্ণিমা' | 'অমাবস্যা' | 'কৃষ্ণপক্ষ' | 'শুক্লপক্ষ';
  events: string[];
  isToday: boolean;
}

export interface TodayInfo {
    bengaliYear: number;
    bengaliMonthIndex: number;
    bengaliDate: number;
}
