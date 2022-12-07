import styled from '@emotion/styled';
import { useState } from 'react';
import { Comment } from '../../../lib/api/types';
import { black } from '../../../lib/styles/palette';
import { formatDate } from '../../../lib/utils';
import Avatar from '../../common/Avatar';
import CommentExpander from './CommentExpander';
import SubCommentList from './SubCommentList';

interface Props {
  comment: Comment;
  isSubComment?: boolean;
}

function CommentItem({ comment, isSubComment }: Props) {
  const {
    writer: { profileImageUrl, username, displayName },
    content,
    subComments,
    subCommentsCount,
    createdAt,
  } = comment;

  const [isExpander, setIsExpander] = useState(false);

  const handleClickExpander = () => {
    setIsExpander(!isExpander);
  };

  return (
    <Block>
      <Author>
        <Avatar src={profileImageUrl} href={`/@${username}`} size={isSubComment ? 24 : 42} />
      </Author>
      <Body>
        <BodyHeader>
          <Name>{displayName}</Name>
          <CreatedDate>{formatDate(createdAt)}</CreatedDate>
        </BodyHeader>
        <BodyContent>{content}</BodyContent>
        <CommentExpander
          isOpen={isExpander}
          handleClick={handleClickExpander}
          count={subCommentsCount}
          isSubComment={isSubComment}
        />
        {isExpander && subComments && subComments.length !== 0 && (
          <SubCommentList subComments={subComments} />
        )}
      </Body>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Author = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Name = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[800]};
`;

const CreatedDate = styled.div`
  font-size: 0.75rem;
  color: ${black[500]};
  font-weight: bold;
`;

const BodyContent = styled.div`
  font-size: 0.875rem;
  color: ${black[800]};
  margin-top: 0.25rem;
`;

export default CommentItem;
