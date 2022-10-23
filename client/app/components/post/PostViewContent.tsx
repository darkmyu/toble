import styled from '@emotion/styled';

interface Props {
  content: string;
}

function PostViewContent({ content }: Props) {
  return (
    <Section>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Section>
  );
}

const Section = styled.section`
  margin-top: 4rem;
`;

const Content = styled.div``;

export default PostViewContent;
