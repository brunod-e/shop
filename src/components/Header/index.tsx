import { HeaderContainer } from './styles';
import Image from 'next/image';
import logoImg from '../../assets/shop-logo.svg';
import Link from 'next/link';
import { Cart } from '../Cart';

export const Header = () => {
  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt='' />
      </Link>

      <Cart />
    </HeaderContainer>
  );
};
