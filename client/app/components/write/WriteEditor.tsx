import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import 'react-quill/dist/quill.snow.css';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <></>,
});

function WriteEditor({ content, setContent }: Props) {
  return (
    <Block>
      <QuillWrapper theme='snow' value={content} onChange={setContent} />
    </Block>
  );
}

const Block = styled.div`
  padding-top: 3rem;
  flex: 1 1 auto;

  .quill,
  .ql-container {
    font-size: 1rem;
    height: calc(100% - 42px);
  }
`;

export default WriteEditor;
