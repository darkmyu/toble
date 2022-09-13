import { useRouter } from 'next/router';

function Blog() {
  const router = useRouter();
  const username = router.query.username as string;

  return (
    <>
      <h1>{username} Blog</h1>
    </>
  );
}

export default Blog;
