import { styled } from '@/styles';

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  position: 'relative',

  transition: 'all 0.2s ease-in-out',

  span: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    width: '1.25rem',
    height: '1.25rem',

    borderRadius: '100%',
    backgroundColor: '$green500',
    color: '$white',

    fontSize: '0.75rem',
    fontWeight: 700,

    marginLeft: '2.5rem',
    marginTop: '-2.5rem',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  variants: {
    color: {
      green: {
        backgroundColor: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$green300',
        },
      },
      gray: {
        backgroundColor: '$gray800',
        color: '$gray500',

        '&:not(:disabled):hover': {
          backgroundColor: '$gray700',
        },
      },
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: '$xl',
        },
      },
      large: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: '$2xl',
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
});
