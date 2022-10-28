import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { createBlog, getTopics } from '../../lib/api/blog';
import { BlogCreateRequest, BlogCreateResponse } from '../../lib/api/types';
import { media, ResponsiveParent } from '../../lib/styles/media';
import { black, personal } from '../../lib/styles/palette';
import AutoImage from '../common/AutoImage';
import Input from '../common/Input';

function BlogForm() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [topicId, setTopicId] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogCreateRequest>();

  const { data: topics } = useQuery(['getTopics'], getTopics);

  const { mutate } = useMutation((formData: BlogCreateRequest) => createBlog(formData), {
    onError: () => {
      toast.error('예기치 못한 오류가 발생했어요!');
    },
    onSuccess: ({ data: { username } }: AxiosResponse<BlogCreateResponse>) => {
      setUser(prev => (prev ? { ...prev, username } : null));
      router.push(`/@${username}`);
    },
  });

  const onSubmit: SubmitHandler<BlogCreateRequest> = data => {
    if (!topicId) return toast.error('블로그 주제를 선택하세요!');
    data.blogTopicId = topicId;
    mutate(data);
  };

  const onClickTopic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTopicId(+e.currentTarget.value);
  };

  return (
    <Wrapper>
      <Responsive>
        <HeaderWrapper>
          <AutoImage src='/images/dog.png' width={320} />
          <Title>블로그를 만들려면 정보가 필요해요!</Title>
        </HeaderWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TopicList>
            {topics?.map(topic => (
              <Topic
                key={topic.id}
                value={topic.id}
                onClick={onClickTopic}
                active={topicId === topic.id}
              >
                {topic.name}
              </Topic>
            ))}
          </TopicList>
          <InputWrapper>
            <Input
              label='블로그 주소'
              placeholder='30자 이하의 영문 소문자/숫자/특수문자(_)'
              errorMessage={errors.username?.message || null}
              {...register('username', {
                required: { value: true, message: '필수 정보에요!' },
                maxLength: { value: 30, message: '글자 수가 30자를 초과했어요!' },
                pattern: { value: /^[a-z0-9\_]+$/, message: '잘못된 형식이에요!' },
              })}
            />
            <Input
              label='블로그 이름'
              placeholder='블로그 이름'
              errorMessage={errors.title?.message || null}
              {...register('title', { required: { value: true, message: '필수 정보에요!' } })}
            />
          </InputWrapper>
          <StyledButton>블로그 만들기</StyledButton>
        </Form>
      </Responsive>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Responsive = styled(ResponsiveParent)`
  max-width: 768px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: ${black[800]};
`;

const Form = styled.form`
  margin-top: 5rem;
`;

const TopicList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const Topic = styled.button<{ active: boolean }>`
  padding: 0.375rem 1rem;
  border: 1px solid ${black[100]};
  border-radius: 20px;
  background: white;
  font-size: 1rem;
  font-weight: bold;
  color: ${black[500]};
  flex-shrink: 0;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      color: ${personal[800]};
      border-color: ${personal[800]};
    `}

  :hover {
    color: ${personal[800]};
    border-color: ${personal[800]};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin: 5rem 4rem;
  margin-bottom: 9rem;

  ${media.tablet} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background: ${personal[800]};
  border: none;
  border-radius: 20px;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export default BlogForm;
