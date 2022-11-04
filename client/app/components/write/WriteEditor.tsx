import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import { editorStyles } from '../../lib/styles';
import { black } from '../../lib/styles/palette';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <></>,
});

function WriteEditor({ content, setContent }: Props) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
        ],
        handlers: { image: null },
      },
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'image',
  ];

  return (
    <Block>
      <QuillEditor
        theme='snow'
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
    </Block>
  );
}

const Block = styled.div`
  height: 100%;
  min-height: 0px;
  margin-top: 3rem;

  .quill {
    height: 100%;
    display: flex;
    flex-direction: column;

    .ql-toolbar {
      border: none;
      border-bottom: 1px solid ${black[100]};
    }

    .ql-container {
      min-height: 0px;
      position: relative;
      font-size: 1rem;
      border: none;
      margin-top: 1rem;

      .ql-editor {
        padding: 0;
        ${editorStyles};
      }
    }
  }
`;

export default WriteEditor;
