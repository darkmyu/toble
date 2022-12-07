import { SVGProps } from 'react';

function DotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z'
        fill='currentColor'
      />
    </svg>
  );
}

export default DotIcon;
