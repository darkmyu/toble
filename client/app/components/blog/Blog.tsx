import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getBlog } from '../../lib/api/blogApi';
import BlogProfile from './BlogProfile';

function Blog() {
  const router = useRouter();
  const username = router.query.username as string;
  const { data: blog } = useQuery(['blog', username], () => getBlog(username), {
    enabled: username ? true : false,
  });

  if (!blog) return <>Blog is not found</>;

  return (
    <Block>
      <BlogProfile blog={blog} />
    </Block>
  );
}

const Block = styled.main`
  padding-top: 10rem;
`;

export default Blog;
