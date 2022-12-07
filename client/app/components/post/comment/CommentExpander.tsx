import styled from '@emotion/styled';
import { black, personal } from '../../../lib/styles/palette';
import { MinusIcon, PlusIcon } from '../../icon/vector';

interface Props {
  isOpen: boolean;
  handleClick: () => void;
  count: number;
  isSubComment?: boolean;
}

function CommentExpander({ isOpen, handleClick, count, isSubComment }: Props) {
  const text = count === 0 ? '답글 달기' : `${count}개의 답글`;

  return (
    <CommentExpanderBlock onClick={handleClick} isSubComment={isSubComment}>
      {isOpen ? <MinusIcon /> : <PlusIcon />}
      {text}
    </CommentExpanderBlock>
  );
}

const CommentExpanderBlock = styled.div<{ isSubComment?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.625rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: bold;
  color: ${({ isSubComment }) => (isSubComment ? black[500] : personal[800])};
  path {
    fill: ${({ isSubComment }) => (isSubComment ? black[500] : personal[800])};
  }
`;

export default CommentExpander;
