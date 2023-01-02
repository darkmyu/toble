import { useState } from 'react';

export function useToggle() {
  const [isToggle, setIsToggle] = useState(false);

  const handleClickToggle = () => {
    setIsToggle(!isToggle);
  };

  return { isToggle, handleClickToggle };
}
