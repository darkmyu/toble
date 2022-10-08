import { useRouter } from 'next/router';
import { useRef } from 'react';

export const useWrite = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDownCancelEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onInputTextareaResize = () => {
    if (titleRef === null || titleRef.current === null) return;
    titleRef.current.style.height = '48px';
    titleRef.current.style.height = titleRef.current?.scrollHeight + 'px';
  };

  const onClickExit = () => {
    router.back();
  };

  return { onKeyDownCancelEnter, onInputTextareaResize, titleRef, onClickExit };
};
