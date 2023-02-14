import { styled } from '@/styles';

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  position: 'relative',

  backgroundColor: '$gray800',
  color: '$gray500',

  width: '3rem',
  height: '3rem',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  svg: {
    fontSize: '$xl',
  },
});
