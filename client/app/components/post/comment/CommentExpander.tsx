import styled from '@emotion/styled';
import { personal } from '../../../lib/styles/palette';
import { MinusIcon, PlusIcon } from '../../icon/vector';

interface Props {
  isOpen: boolean;
  handleClick: () => void;
  count: number;
}

function CommentExpander({ isOpen, handleClick, count }: Props) {
  const text = count === 0 ? '답글 달기' : `${count}개의 답글`;

  return (
    <CommentExpanderBlock onClick={handleClick}>
      {isOpen ? <MinusIcon /> : <PlusIcon />}
      {text}
    </CommentExpanderBlock>
  );
}

const CommentExpanderBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.625rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: bold;
  color: ${personal[800]};

  path {
    fill: ${personal[800]};
  }
`;

export default CommentExpander;
