import { getTodayRange, getYesterdayRange, getThisWeekRange, parseDateRange } from './src/utils/date.utils';

console.log('--- Debugging Date Utils ---');
console.log('Current System Time:', new Date().toISOString());

const today = getTodayRange();
console.log('Today Range (PKT):');
console.log('  Start:', today.startDate.toISOString());
console.log('  End:  ', today.endDate.toISOString());

const yesterday = getYesterdayRange();
console.log('Yesterday Range (PKT):');
console.log('  Start:', yesterday.startDate.toISOString());
console.log('  End:  ', yesterday.endDate.toISOString());

const custom = parseDateRange('2025-12-18', '2025-12-18');
console.log('Custom "2025-12-18" (PKT):');
console.log('  Start:', custom.startDate.toISOString());
console.log('  End:  ', custom.endDate.toISOString());

console.log('----------------------------');
