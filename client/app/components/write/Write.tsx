import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import { createPost } from '../../lib/api/postApi';
import { PostCreateRequest } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black, personal } from '../../lib/styles/palette';
import { useWrite } from './hooks/useWrite';
import WriteEditor from './WriteEditor';

function Write() {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [content, setContent] = useState('');
  const { onKeyDownCancelEnter, onInputTextareaResize, titleRef, onClickExit } = useWrite();

  const createPostMutation = useMutation((data: PostCreateRequest) => createPost(data), {
    onError: () => {
      toast.error('예기치 못한 오류가 발생했어요!');
    },
    onSuccess: ({ id }) => {
      router.push(`/@${user?.username}/${id}`);
    },
  });

  const onSubmitPost = () => {
    if (!titleRef.current) return;
    if (titleRef.current.value.length === 0) {
      return toast.error('제목이 비어있어요!');
    }

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
            <Button onClick={onClickExit} exit>
              나가기
            </Button>
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

const Button = styled.button<{ exit?: boolean }>`
  background: ${props => (props.exit ? black[400] : personal[800])};
  margin-right: ${props => props.exit && '0.875rem'};
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export default Write;
