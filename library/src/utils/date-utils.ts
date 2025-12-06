export const formatDate = (date: Date, format: string): string => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (format === "MMMM yyyy") {
    return `${month} ${year}`;
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

export const getWeekDays = (month: number, year: number, week: number): Date[] => {
  const days: Date[] = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(new Date(year, month));

  // Calculate the date of the first day in the week
  const startDay = week * 7 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

  for (let i = 0; i < 7; i++) {
    const day = startDay + i;
    let date: Date;

    if (day < 1) {
      // Days from previous month
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(new Date(prevYear, prevMonth));
      date = new Date(prevYear, prevMonth, daysInPrevMonth + day);
    } else if (day > daysInMonth) {
      // Days from next month
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      date = new Date(nextYear, nextMonth, day - daysInMonth);
    } else {
      // Days from current month
      date = new Date(year, month, day);
    }

    days.push(date);
  }

  return days;
};

export const getWeeksInMonth = (date: Date): number => {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const daysInMonth = getDaysInMonth(date);

  // Calculate total number of weeks
  return Math.ceil((firstDayOfMonth + daysInMonth) / 7);
};
