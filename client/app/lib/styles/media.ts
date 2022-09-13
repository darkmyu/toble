import styled from '@emotion/styled';

export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const media = {
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1024),
  medium: mediaQuery(768),
  small: mediaQuery(425),
  xsmall: mediaQuery(375),
  custom: mediaQuery,
};

export const ResponsiveParent = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
`;
