export const formatDate = (date: Date, format: string): string => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (format === "MMMM yyyy") {
    return `${month} ${year}`;
  }
  if (format === "MMMM d, yyyy") {
    return `${month} ${day}, ${year}`;
  }
  if (format === "d") {
    return day.toString();
  }

  return date.toLocaleDateString();
};

export const isDateSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};

export const isDateToday = (date: Date): boolean => {
  return isDateSameDay(date, new Date());
};

export const isDateBefore = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() < d2.getTime();
};

export const isDateAfter = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() > d2.getTime();
};

export const isDateTimeWithinInterval = (date: Date, interval: { start: Date; end: Date }): boolean => {
  const time = date.getTime();
  return time >= interval.start.getTime() && time <= interval.end.getTime();
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const subMonths = (date: Date, months: number): Date => {
  return addMonths(date, -months);
};

export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getDaysInMonth = (date: Date): number => {
  return endOfMonth(date).getDate();
};

export const getFirstDayOfMonth = (date: Date): number => {
  return startOfMonth(date).getDay();
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

export const getWeekDays = (month: number, year: number, week: number): (Date | null)[] => {
  const days: (Date | null)[] = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(new Date(year, month));

  // Calculate the date of the first day in the week (Sunday-start)
  const startDay = week * 7 - firstDayOfMonth + 1;

  for (let i = 0; i < 7; i++) {
    const day = startDay + i;

    if (day < 1 || day > daysInMonth) {
      // Outside current month — empty cell
      days.push(null);
    } else {
      days.push(new Date(year, month, day));
    }
  }

  return days;
};

export const getWeeksInMonth = (date: Date): number => {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const daysInMonth = getDaysInMonth(date);

  // Calculate total number of weeks
  return Math.ceil((firstDayOfMonth + daysInMonth) / 7);
};

export const startOfWeek = (date: Date): Date => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
};

export const endOfWeek = (date: Date): Date => {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return d;
};

export const getWeekDates = (date: Date): Date[] => {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export const addWeeks = (date: Date, weeks: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
};

export const subWeeks = (date: Date, weeks: number): Date => {
  return addWeeks(date, -weeks);
};

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const subDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};
