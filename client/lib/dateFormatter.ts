import { isToday, isYesterday, isThisWeek, format } from "date-fns";

export function getSectionTitle(timestamp: number): string {
  const date = new Date(timestamp);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date, { weekStartsOn: 1 })) return "This Week";

  return format(date, "MMMM yyyy");
}

export function formatReceiptThumbnailTimeStamp(timestamp: number): string {
  const date = new Date(timestamp);
  const timeString = format(date, "HH:mm a");

  if (isToday(date)) return `Today • ${timeString}`;
  if (isYesterday(date)) return `Yesterday • ${timeString}`;

  const dayString = format(date, "MMM dd");
  return `${dayString} • ${timeString}`;
}

export function formatReceiptDetailTimeStamp(timestamp: number): string {
  const date = new Date(timestamp);
  const timeString = format(date, "HH:mm a");

  if (isToday(date)) return `Today • ${timeString}`;
  if (isYesterday(date)) return `Yesterday • ${timeString}`;

  const dayString = format(date, "MMM dd, yyyy").toLocaleUpperCase();
  return `${dayString} • ${timeString}`;
}