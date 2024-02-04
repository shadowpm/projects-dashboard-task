export const formatDatesRange = (
  beginDate: string,
  expireDate?: string,
): string => {
  const begin = new Date(beginDate);

  if (!expireDate) {
    return 'From ' + formatSingleDate(begin);
  }
  const expire = new Date(expireDate);
  return `From ${formatSingleDate(begin)} to ${formatSingleDate(expire)}`;
};

export const formatSingleDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
