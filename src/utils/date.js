const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return dateFormatter.format(d);
}

