import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';

interface Props {
  blog: Blog;
}

function BlogProfile({ blog }: Props) {
  const { profileImageUrl, title, shortWord, username } = blog;

  return (
    <Section>
      <Responsive>
        <Profile>
          <Link href={`/@${username}`}>
            <a>
              {profileImageUrl && (
                <Image src={profileImageUrl} width={140} height={140} alt='profile' />
              )}
            </a>
          </Link>
          <ProfileRest>
            <Description>
              <h1 className='title'>{title}</h1>
              <div className='follow'>follow component</div>
              <h3 className='short-word'>
                {shortWord ? shortWord : '간단한 자기소개를 작성해보세요!'}
              </h3>
            </Description>
            <div>profile icons & logout button</div>
          </ProfileRest>
        </Profile>
      </Responsive>
    </Section>
  );
}

const Section = styled.section``;

const Responsive = styled(ResponsiveParent)``;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  a {
    padding: 2rem;
  }

  img {
    border-radius: 50%;
  }
`;

const ProfileRest = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 4rem;
  margin-right: 2rem;
`;

const Description = styled.div`
  .title {
    margin: 0;
    color: ${black[800]};
    font-size: 1.5rem;
  }

  .follow {
    padding-top: 0.75rem;
    padding-bottom: 1.75rem;
  }

  .short-word {
    margin: 0;
    font-size: 0.875rem;
    color: ${black[700]};
  }
`;

export default BlogProfile;
