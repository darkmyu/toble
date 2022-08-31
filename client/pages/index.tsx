import Header from '../app/components/base/Header';
import Navbar from '../app/components/base/NavBar';
import useAuthEffect from '../app/hooks/useAuthEffect';

export default function Home() {
  useAuthEffect();

  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
