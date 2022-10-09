import styled from '@emotion/styled';

export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const media = {
  desktop: mediaQuery(1440),
  laptop: mediaQuery(1024),
  tablet: mediaQuery(870),
  mobile: mediaQuery(768),
  custom: mediaQuery,
};

export const ResponsiveParent = styled.div`
  width: 1140px;
  margin-left: auto;
  margin-right: auto;

  ${media.custom(1140)} {
    width: 850px;
  }

  ${media.tablet} {
    width: calc(100% - 1.25rem);
  }
`;
