import { formatDatesRange, formatSingleDate } from './dateFormatter';

describe('formatDatesRange', () => {
  test('formats single date correctly', () => {
    const beginDate = '2022-01-01';
    const formattedDate = formatDatesRange(beginDate);

    expect(formattedDate).toBe('From 2022.01.01');
  });

  test('formats date range correctly', () => {
    const beginDate = '2022-01-01';
    const expireDate = '2022-01-10';
    const formattedDate = formatDatesRange(beginDate, expireDate);

    expect(formattedDate).toBe('From 2022.01.01 to 2022.01.10');
  });

  test('handles undefined expireDate correctly', () => {
    const beginDate = '2022-01-01';
    const formattedDate = formatDatesRange(beginDate);

    expect(formattedDate).toBe('From 2022.01.01');
  });
});

describe('formatSingleDate', () => {
  test('formats date correctly', () => {
    const date = new Date('2022-01-01');
    const formattedDate = formatSingleDate(date);

    expect(formattedDate).toBe('2022.01.01');
  });
});
