import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPost } from '../../lib/api/postApi';
import { PostCreateRequest } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black, personal } from '../../lib/styles/palette';
import { useWrite } from './hooks/useWrite';
import WriteEditor from './WriteEditor';

function Write() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { onKeyDownCancelEnter, onInputTextareaResize, titleRef } = useWrite();

  const createPostMutation = useMutation((data: PostCreateRequest) => createPost(data), {
    onSuccess: () => {
      router.push('/');
    },
  });

  const onSubmitPost = () => {
    // 에러 핸들링 모달 추가 (?)
    if (!titleRef.current) return;
    if (titleRef.current.value.length === 0) return;

    const title = titleRef.current.value;
    const description = '';

    createPostMutation.mutate({ title, content, description });
  };

  return (
    <Main>
      <Responsive>
        <Wrapper>
          <TitleBlock>
            <Textarea
              placeholder='제목을 입력하세요'
              onKeyDown={onKeyDownCancelEnter}
              onInput={onInputTextareaResize}
              ref={titleRef}
            />
          </TitleBlock>
          <WriteEditor content={content} setContent={setContent} />
          <ButtonGroup>
            <Button onClick={onSubmitPost}>작성 완료</Button>
          </ButtonGroup>
        </Wrapper>
      </Responsive>
    </Main>
  );
}

const Main = styled.main`
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
  height: 100%;
`;

const Responsive = styled(ResponsiveParent)`
  max-width: 768px;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const TitleBlock = styled.div`
  padding-top: 1rem;
  border-bottom: 2px solid ${black[50]};
`;

const Textarea = styled.textarea`
  display: block;
  padding: 0;
  width: 100%;
  height: 48px;
  resize: none;
  outline: none;
  border: none;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${black[800]};
  font-family: inherit;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

const Button = styled.button`
  background: ${personal[800]};
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export default Write;
