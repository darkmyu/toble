import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getBlog } from './../../../lib/api/blogApi';
import { Blog } from './../../../lib/api/types';

export const useBlog = (username: string) => {
  const [query, setQuery] = useState(false);
  const [blog, setBlog] = useState<Blog>({
    username: '',
    displayName: '',
    shortWord: '',
    profileImageUrl: '',
    title: '',
    favoritesCount: 0,
    followersCount: 0,
  });

  const { data, isLoading, error } = useQuery(['blog', username], () => getBlog(username), {
    enabled: query,
    retry: false,
  });

  useEffect(() => {
    username ? setQuery(true) : setQuery(false);

    if (!isLoading) {
      setQuery(false);
      setBlog(data!);
    }
  }, [data, isLoading, username]);

  return { blog, error };
};
