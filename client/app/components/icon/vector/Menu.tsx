import { SVGProps } from 'react';

function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512' {...props}>
      <path
        fill='currentColor'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='48'
        d='M160 144h288M160 256h288M160 368h288'
      />
      <circle
        cx='80'
        cy='144'
        r='16'
        fill='currentColor'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='80'
        cy='256'
        r='16'
        fill='currentColor'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='80'
        cy='368'
        r='16'
        fill='currentColor'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  );
}

export default Menu;
