const currentDay = new Date();

export const DaysUntil = (saleEndDate) => {
  const date = new Date(saleEndDate);

  const diffInTime = date.getTime() - currentDay.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  return Math.floor(diffInDays) + 1;
};

export const Sale = (total, num) => total - total * Number(`.${num}`);
