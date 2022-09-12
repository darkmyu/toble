import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { blogModalState } from '../../../atoms/blogModalState';

interface BlogModalInputs {
  username: string;
  name: string;
}

export const useBlogModal = () => {
  const inputDescriptions = {
    usernameTitle: '블로그 주소',
    usernameDescription: 'https://toble.com/{블로그 주소}',
    usernamePlaceholder: '30자 이하의 영문 소문자/숫자/특수문자(_) 입력',
    nameTitle: '블로그 이름',
    nameDescription: '블로그 이름은 언제든지 설정에서 변경할 수 있어요!',
    namePlaceholder: '블로그 이름 입력',
  };

  const inputErrorMessages = {
    requiredMessage: '필수 정보에요!',
    maxLengthMessage: '글자 수가 30자를 초과했어요!',
    patternMessage: '형식에 맞게 입력해주세요!',
  };

  const [isActive, setActive] = useRecoilState(blogModalState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogModalInputs>();

  const onClickCancel = () => {
    setActive(false);
    reset();
  };

  const onSubmitInputs: SubmitHandler<BlogModalInputs> = data => {
    console.log(data);
  };

  return {
    isActive,
    inputDescriptions,
    inputErrorMessages,
    register,
    handleSubmit,
    errors,
    onSubmitInputs,
    onClickCancel,
  };
};
