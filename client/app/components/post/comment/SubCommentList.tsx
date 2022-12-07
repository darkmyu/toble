import styled from '@emotion/styled';
import { Comment } from '../../../lib/api/types';
import CommentItem from './CommentItem';

interface Props {
  subComments: Comment[];
}

function SubCommentList({ subComments }: Props) {
  return (
    <Block>
      {subComments.map(subComment => (
        <CommentItem key={subComment.id} comment={subComment} isSubComment />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

export default SubCommentList;
