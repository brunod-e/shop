import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    '::-webkit-scrollbar': {
      width: '0.4rem',
    },
    '::-webkit-scrollbar-track': {
      background: '$gray800',
    },
    '::-webkit-scrollbar-thumb': {
      background: '$green500',
      borderRadius: 10,
    },
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, button, textarea': {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
  },

  a: {
    color: 'inherit',
  },

  button: {
    cursor: 'pointer',
    border: 'none',
  },
});
