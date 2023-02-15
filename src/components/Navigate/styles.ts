import { styled } from '@/styles';

export const NavigateButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: 0,
  bottom: 0,

  width: '8.5rem',
  height: 656,
  color: '$gray100',

  background:
    'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',

  svg: {
    width: '2.5rem',
    height: '2.5rem',
  },

  '&:hover': {
    color: '$gray300',
  },

  variants: {
    direction: {
      next: {
        right: 0,
      },
      prev: {
        left: 0,
        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      },
    },
  },
});
