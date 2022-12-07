import styled from '@emotion/styled';
import { Comment } from '../../../lib/api/types';
import { black } from '../../../lib/styles/palette';
import { CommentIcon } from '../../icon/vector';
import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  commentsCount: number;
}

function CommentList({ comments, commentsCount }: Props) {
  return (
    <Section>
      <CommentHeader>
        <CommentIcon />
        {commentsCount}
      </CommentHeader>
      <CommentItems>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </CommentItems>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[500]};
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${black[100]};
`;

const CommentItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export default CommentList;
