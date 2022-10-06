import Header from '../app/components/base/Header';
import Write from '../app/components/write/Write';
import useAuthCheckEffect from '../app/hooks/useAuthCheckEffect';

function WritePage() {
  useAuthCheckEffect();

  return (
    <>
      <Header />
      <Write />
    </>
  );
}

export default WritePage;
