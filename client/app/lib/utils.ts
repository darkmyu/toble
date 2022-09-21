export const formatNumber = (number: number) => {
  if (number < 10000) {
    return number;
  }

  if (number >= 10000) {
    const result = Math.floor((number / 10000) * 10) / 10;
    return `${result.toLocaleString('ko-KR')} 만`;
  }
};
