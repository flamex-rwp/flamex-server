export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Fixed timezone offset for Pakistan Standard Time (PKT)
// PKT is UTC+5
const PKT_OFFSET_HOURS = 5;

/**
 * Get current time in PKT
 */
const getNowPKT = (): Date => {
  const now = new Date();
  // Add 5 hours to current UTC time to get PKT time components
  // Note: We're creating a Date object that "looks" like PKT but is actually stored as UTC
  // basically shifting the time so .getDay(), .getDate() returns PKT values
  return new Date(now.getTime() + (PKT_OFFSET_HOURS * 60 * 60 * 1000));
};

/**
 * Convert a PKT-based Date back to a true UTC timestamp for the database
 * @param pktDate A Date object representing a time in PKT
 * @returns A Date object shifted back to true UTC
 */
const pktToUtc = (pktDate: Date): Date => {
  return new Date(pktDate.getTime() - (PKT_OFFSET_HOURS * 60 * 60 * 1000));
};

export const parseDateRange = (start?: string, end?: string): DateRange => {
  const nowPKT = getNowPKT();

  // Default end is End of Today (PKT)
  const defaultEndPKT = new Date(nowPKT);
  defaultEndPKT.setHours(23, 59, 59, 999); // 23:59 PKT

  // Default start is 30 days ago (PKT)
  const defaultStartPKT = new Date(nowPKT);
  defaultStartPKT.setDate(defaultStartPKT.getDate() - 30);
  defaultStartPKT.setHours(0, 0, 0, 0); // 00:00 PKT

  // If strings are provided (e.g. "2025-12-18"), new Date() parses them as UTC midnight
  // We want to treat "2025-12-18" as "2025-12-18 00:00 PKT"
  // So if we have "2025-12-18T00:00:00.000Z", we need to shift it -5h to be "2025-12-17T19:00:00.000Z" (which is 00:00 PKT)

  let startPKT = defaultStartPKT;
  if (start) {
    const s = new Date(start);
    if (!isNaN(s.getTime())) {
      s.setHours(0, 0, 0, 0);
      // "s" is now 00:00 UTC. We want it to be 00:00 PKT.
      // If we treat "s" as holding PKT components, we just need to shift it back to UTC.
      // Since 's' was parsed from string, it IS the literal date components we want.
      // e.g. "2025-12-18". s is "2025-12-18 00:00 UTC". 
      // We want this to represent "2025-12-18 00:00 PKT".
      // To get the UTC timestamp for "00:00 PKT", we subtract 5 hours.
      startPKT = s; // We will shift this later
    }
  }

  let endPKT = defaultEndPKT;
  if (end) {
    const e = new Date(end);
    if (!isNaN(e.getTime())) {
      e.setHours(23, 59, 59, 999);
      endPKT = e; // We will shift this later
    }
  }

  // Apply constraint: start/end strings are interpreted as Local Day (PKT).
  // We need to shift them by -5 hours to get the actual UTC start/end timestamps.

  // Is start/end from arguments already shifted? 
  // If inputs are strings "YYYY-MM-DD", 'new Date()' makes them UTC 00:00.
  // We just subtract 5 hours to make them UTC 19:00 (prev day).

  const finalStart = new Date(startPKT);
  // Careful: if startPKT came from getNowPKT(), it is "UTC + 5". Subtracting 5 gives UTC.
  // If startPKT came from "new Date(string)", it is "UTC aligned to string". Subtracting 5 gives correct UTC for PKT midnight.
  // Both cases need -5h shift.

  // BUT: getNowPKT() logic: new Date(now + 5h).
  // If now is 20:00 UTC. now+5h = 01:00 UTC (numerically).
  // We want to treat that 01:00 as PKT.
  // 01:00 PKT is 20:00 UTC.
  // So yes, subtract 5h.

  return {
    startDate: pktToUtc(startPKT),
    endDate: pktToUtc(endPKT)
  };
};

export const getTodayRange = (): DateRange => {
  const nowPKT = getNowPKT();

  const startPKT = new Date(nowPKT);
  startPKT.setHours(0, 0, 0, 0);

  const endPKT = new Date(nowPKT);
  endPKT.setHours(23, 59, 59, 999);

  return { startDate: pktToUtc(startPKT), endDate: pktToUtc(endPKT) };
};

export const getYesterdayRange = (): DateRange => {
  const nowPKT = getNowPKT();
  nowPKT.setDate(nowPKT.getDate() - 1);

  const startPKT = new Date(nowPKT);
  startPKT.setHours(0, 0, 0, 0);

  const endPKT = new Date(nowPKT);
  endPKT.setHours(23, 59, 59, 999);

  return { startDate: pktToUtc(startPKT), endDate: pktToUtc(endPKT) };
};

export const getThisWeekRange = (): DateRange => {
  const nowPKT = getNowPKT();
  const dayOfWeek = nowPKT.getDay(); // 0-6

  const startPKT = new Date(nowPKT);
  startPKT.setDate(nowPKT.getDate() - dayOfWeek);
  startPKT.setHours(0, 0, 0, 0);

  const endPKT = new Date(nowPKT);
  endPKT.setHours(23, 59, 59, 999);

  return { startDate: pktToUtc(startPKT), endDate: pktToUtc(endPKT) };
};

export const getThisMonthRange = (): DateRange => {
  const nowPKT = getNowPKT();

  const startPKT = new Date(nowPKT.getFullYear(), nowPKT.getMonth(), 1);
  startPKT.setHours(0, 0, 0, 0);

  const endPKT = new Date(nowPKT);
  endPKT.setHours(23, 59, 59, 999);

  return { startDate: pktToUtc(startPKT), endDate: pktToUtc(endPKT) };
};