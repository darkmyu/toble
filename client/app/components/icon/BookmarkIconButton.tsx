import styled from '@emotion/styled';
import { black, personal } from '../../lib/styles/palette';
import DynamicIconButton from './DynamicIconButton';
import { BookmarkFillIcon, BookmarkOutlineIcon } from './vector';

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

const StyledBookmarkOutline = styled(BookmarkOutlineIcon)`
  color: ${black[500]};
`;

const StyledBookmarkFill = styled(BookmarkFillIcon)`
  color: ${personal[800]} !important;
`;

export default BookmarkIconButton;
