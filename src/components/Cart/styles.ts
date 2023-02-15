import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@/styles';

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  backgroundColor: '$gray800',
  padding: '4.5rem 3rem 3rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  display: 'flex',
  flexDirection: 'column',

  h2: {
    fontSize: '$lg',
    fontWeight: 700,
    color: '$gray100',
    marginBottom: '2rem',
  },

  p: {
    fontSize: '$md',
    color: '$gray100',
  },

  '> section': {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '1.5rem',
    overflowY: 'auto',
  },
});
export const CartClose = styled(Dialog.Close, {
  background: 'none',
  color: '$gray500',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',

  svg: {
    fontSize: '$xl',
  },
});

export const CartProduct = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  height: '6rem',
});

export const CartProductImage = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  height: '6rem',
  width: '6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
});

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  p: {
    fontSize: '$md',
    color: '$gray300',
  },

  strong: {
    marginTop: 4,
    fontSize: '$md',
    fontWeight: 700,
  },

  button: {
    marginTop: 'auto',
    width: 'max-content',
    background: 'none',
    color: '$green500',

    fontSize: '1rem',
    fontWeight: 700,
  },
});

export const CartInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',

  button: {
    width: '100%',
    backgroundColor: '$green500',
    color: '$white',
    fontSize: '$md',
    height: '4rem',
    borderRadius: 8,
    fontWeight: 700,

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      transition: '0.2s',
      backgroundColor: '$green300',
    },
  },
});

export const CartInfosTotal = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 55,
  gap: 8,

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    '&:last-child': {
      fontWeight: 700,

      span: {
        fontSize: '$md',
      },

      p: {
        fontSize: '$xl',
        color: '$gray100',
      },
    },
  },
});
