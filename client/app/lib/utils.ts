import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatNumber = (number: number) => {
  if (number < 10000) {
    return number.toLocaleString('ko-KR');
  }

  if (number >= 10000) {
    const result = Math.floor((number / 10000) * 10) / 10;
    return `${result.toLocaleString('ko-KR')} 만`;
  }
};

export const formatDate = (date: string, isFormat: boolean = true) => {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60 * 5) {
    return '방금 전';
  }

  if (diff < 60 * 60 * 24) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  if (diff < 60 * 60 * 24 * 7) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  return isFormat
    ? format(d, 'yyyy년 M월 d일')
    : formatDistanceToNow(d, { addSuffix: true, locale: ko });
};
