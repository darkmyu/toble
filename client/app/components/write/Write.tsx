import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import { createPost, getPost, updatePost } from '../../lib/api/post';
import { PostCreateRequest, PostUpdateRequest } from '../../lib/api/types';
import { black } from '../../lib/styles/palette';
import WriteEditor from './WriteEditor';
import WriteFormTemplate from './WriteFormTemplate';

function Write() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const user = useRecoilValue(userState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  // const titleRef = useRef<HTMLTextAreaElement>(null);

  const { data } = useQuery(['getPost2', id], () => getPost(parseInt(id, 10)), {
    enabled: !!id,
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDownCancelEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleInputTextareaResize = () => {
    //
  };

  const createPostMutation = useMutation((data: PostCreateRequest) => createPost(data), {
    onError: () => {
      toast.error('예기치 못한 오류가 발생했어요!');
    },
    onSuccess: ({ id }) => {
      router.push(`/@${user?.username}/${id}`);
    },
  });

  const updatePostMutation = useMutation(
    (data: PostUpdateRequest) => updatePost(parseInt(id, 10), data),
    {
      onError: () => {
        toast.error('예기치 못한 오류가 발생했어요!');
      },
      onSuccess: ({ id }) => {
        router.push(`/@${user?.username}/${id}`);
      },
    }
  );

  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      return toast.error('제목이 비어있어요!');
    }

    /**
     * @todo add description component
     */
    const description = '';

    isEdit
      ? updatePostMutation.mutate({ title, content })
      : createPostMutation.mutate({ title, content, description });
  };

  useEffect(() => {
    !!data && setIsEdit(true);
  }, [data]);

  useEffect(() => {
    isEdit ? setText('수정 완료') : setText('작성 완료');
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && !!data) {
      setTitle(data.post.title);
      setContent(data.post.content);
    }
  }, [data, isEdit]);

  if (isEdit && user?.id !== data?.post.writer.id) return <></>;

  return (
    <WriteFormTemplate buttonText={text} onSubmit={handleSubmitPost}>
      <TitleBlock>
        <Textarea
          value={title}
          placeholder='제목을 입력하세요'
          onInput={handleInputTextareaResize}
          onKeyDown={handleKeyDownCancelEnter}
          onChange={handleChangeTitle}
        />
      </TitleBlock>
      <WriteEditor content={content} setContent={setContent} />
    </WriteFormTemplate>
  );
}

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

export default Write;
