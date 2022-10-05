import styled from '@emotion/styled';

export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const media = {
  desktop: mediaQuery(1440),
  laptop: mediaQuery(1024),
  tablet: mediaQuery(768),
  mobileLarge: mediaQuery(425),
  mobileMiddle: mediaQuery(375),
  mobileSmall: mediaQuery(320),
  custom: mediaQuery,
};

export const ResponsiveParent = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;

  ${media.custom(1140)} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
