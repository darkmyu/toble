import styled from '@emotion/styled';

export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const media = {
  desktop: mediaQuery(1440),
  main: mediaQuery(1140),
  laptop: mediaQuery(1024),
  tablet: mediaQuery(768),
  mobile: mediaQuery(500),
  custom: mediaQuery,
};

export const ResponsiveParent = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;

  ${media.main} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
