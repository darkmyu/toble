import styled from '@emotion/styled';
import { SubComment } from '../../../lib/api/types';

interface Props {
  subComments: SubComment[];
}

function SubCommentList({ subComments }: Props) {
  return (
    <SubCommentListBlock>
      {subComments.map(subComment => (
        <></>
        // <SubCommentItem key={subComment.id} subComment={subComment} />
      ))}
    </SubCommentListBlock>
  );
}

const SubCommentListBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

export default SubCommentList;
