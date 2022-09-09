import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { blogModalState } from '../../../atoms/blogModalState';

interface BlogModalInputs {
  url: string;
  name: string;
}

export const useBlogModal = () => {
  const [isActive, setActive] = useRecoilState(blogModalState);
  const [inputs, setInputs] = useState<BlogModalInputs>({
    url: '',
    name: '',
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitInputs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
  };

  return { isActive, setActive, inputs, onChangeInputs, onSubmitInputs };
};
