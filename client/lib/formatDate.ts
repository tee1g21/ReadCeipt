import { isToday, isYesterday, isThisWeek, format } from "date-fns";

const dateUnknownText = "Date unknown";

export function parseDateTimeToTimestamp(
  date: string | null,
  time: string | null,
): number | null {
  if (!date) return null;

  try {
    const timeStr = time || "00:00";
    const dateObj = new Date(`${date}T${timeStr}:00`);
    const timestamp = dateObj.getTime();

    return isNaN(timestamp) ? null : timestamp;
  } catch {
    return null;
  }
}

export function getSectionTitle(timestamp: number | null): string {
  if (!timestamp) return dateUnknownText;

  const date = new Date(timestamp);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date, { weekStartsOn: 1 })) return "This Week";

  return format(date, "MMMM yyyy");
}

export function formatReceiptThumbnailTimeStamp(
  timestamp: number | null,
): string {
  if (!timestamp) return dateUnknownText;

  const date = new Date(timestamp);
  const timeString = format(date, "HH:mm a");

  if (isToday(date)) return `Today • ${timeString}`;
  if (isYesterday(date)) return `Yesterday • ${timeString}`;

  const dayString = format(date, "MMM dd");
  return `${dayString} • ${timeString}`;
}

export function formatReceiptDetailTimeStamp(timestamp: number | null): string {
  if (!timestamp) return dateUnknownText;

  const date = new Date(timestamp);
  const timeString = format(date, "HH:mm a");

  if (isToday(date)) return `Today • ${timeString}`;
  if (isYesterday(date)) return `Yesterday • ${timeString}`;

  const dayString = format(date, "MMM dd, yyyy").toLocaleUpperCase();
  return `${dayString} • ${timeString}`;
}
