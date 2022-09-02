import { keyframes } from '@emotion/react';

const popInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

const popOutDown = keyframes`
  0% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const transitions = {
  popInUp,
  popOutDown,
};

export default transitions;
