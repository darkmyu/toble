import styled from '@emotion/styled';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  width?: number;
}

function AutoImage({ width, ...props }: Props) {
  return (
    <ImageWrapper width={width}>
      <Image layout='fill' alt='' {...props} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<{ width?: number }>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};

  span {
    position: unset !important;

    img {
      object-fit: cover !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

export default AutoImage;
