import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { blogModalState } from '../../../atoms/blogModalState';
import { createBlog } from '../../../lib/api/blogApi';
import { getTopics } from './../../../lib/api/blogApi';

export interface BlogModalInputs {
  username: string;
  title: string;
  blogTopicId: string;
}

const inputDescriptions = {
  usernameTitle: '블로그 주소',
  usernameDescription: 'https://toble.com/{블로그 주소}',
  usernamePlaceholder: '30자 이하의 영문 소문자/숫자/특수문자(_) 입력',
  nameTitle: '블로그 이름',
  nameDescription: '블로그 이름은 언제든지 설정에서 변경할 수 있어요!',
  namePlaceholder: '블로그 이름 입력',
  topicTitle: '블로그 주제',
  topicDescription: '블로그 주제를 선택해주세요!',
};

const inputErrorMessages = {
  requiredMessage: '필수 정보에요!',
  maxLengthMessage: '글자 수가 30자를 초과했어요!',
  patternMessage: '형식에 맞게 입력해주세요!',
};

export const useBlogModal = () => {
  const [isActive, setActive] = useRecoilState(blogModalState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogModalInputs>();

  const { data: topics } = useQuery(['getTopics'], getTopics, { enabled: isActive });

  const createMutation = useMutation((formData: BlogModalInputs) => createBlog(formData), {
    onError: err => {
      console.log(err);
      // router.push('/errors');
    },
    onSuccess: ({ data: username }: AxiosResponse<{ username: string }>) => {
      setActive(false);
      router.push(`/@${username}`);
    },
  });

  const onClickCancel = () => {
    setActive(false);
    reset();
  };

  const onSubmitInputs: SubmitHandler<BlogModalInputs> = data => {
    data.title = data.title.replace(/ +(?= )/g, '');
    createMutation.mutate(data);
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
    topics,
  };
};
