export const getMonthStartAndEndDates = (
  inputDate: string
): { startOfMonth: Date; endOfMonth: Date } => {
  // Split the input into month and year
  const parts = inputDate.trim().split(" ");

  if (parts.length !== 2 || isNaN(Number(parts[1]))) {
    throw new Error("Invalid date format. Use 'MMM YYYY', e.g., 'Dec 2024'.");
  }

  const month = parts[0]; // e.g., "Dec"
  const year = Number(parts[1]); // e.g., 2024

  // Parse the month name into a 0-based index
  const monthIndex = new Date(`${month} 1`).getMonth();
  if (isNaN(monthIndex)) {
    throw new Error("Invalid month abbreviation. Use a valid month, e.g., 'Dec'.");
  }

  // Calculate start and end dates
  const startOfMonth = new Date(year, monthIndex, 1);
  const endOfMonth = new Date(year, monthIndex + 1, 0);

  return { startOfMonth, endOfMonth };
};
