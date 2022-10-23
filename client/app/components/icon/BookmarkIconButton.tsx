import styled from '@emotion/styled';
import { black, personal } from '../../lib/styles/palette';
import DynamicIconButton from './DynamicIconButton';
import { BookmarkFill, BookmarkOutline } from './vector';

interface Props {
  size: number;
  isActive: boolean;
  onClick?: () => void;
}

function BookmarkIconButton({ size, isActive, onClick }: Props) {
  return (
    <DynamicIconButton
      size={size}
      isActive={isActive}
      onClick={onClick}
      activeIcon={<StyledBookmarkFill />}
      inactiveIcon={<StyledBookmarkOutline />}
    />
  );
}

const StyledBookmarkOutline = styled(BookmarkOutline)`
  color: ${black[500]};
`;

const StyledBookmarkFill = styled(BookmarkFill)`
  color: ${personal[800]} !important;
`;

export default BookmarkIconButton;
