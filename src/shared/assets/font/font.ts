import localFont from 'next/font/local';

const SUIT = localFont({
  src: './SUIT-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suit',
});

export default SUIT;
