import styled from '@emotion/styled';
import { useState } from 'react';
import { Comment } from '../../../lib/api/types';
import { black } from '../../../lib/styles/palette';
import Avatar from '../../common/Avatar';
import CommentExpander from './CommentExpander';
import SubCommentList from './SubCommentList';

interface Props {
  comment: Comment;
}

function CommentItem({ comment }: Props) {
  const {
    writer: { profileImageUrl, username, displayName },
    content,
    subComments,
    subCommentsCount,
  } = comment;

  const [isExpander, setIsExpander] = useState(false);

  const handleClickExpander = () => {
    // check subCommentsCount === 0 exception
    setIsExpander(!isExpander);
  };

  return (
    <Block>
      <Author>
        <Avatar src={profileImageUrl} href={`/@${username}`} size={42} />
      </Author>
      <Body>
        <DisplayName>{displayName}</DisplayName>
        <Content>{content}</Content>
        <CommentExpander
          isOpen={isExpander}
          handleClick={handleClickExpander}
          count={subCommentsCount}
        />
        {isExpander && <SubCommentList subComments={subComments} />}
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

const DisplayName = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[800]};
`;

const Content = styled.div`
  font-size: 0.875rem;
  color: ${black[800]};
  margin-top: 0.25rem;
`;

export default CommentItem;
