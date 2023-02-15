import { HeaderContainer } from './styles';
import Image from 'next/image';
import logoImg from '../../assets/shop-logo.svg';
import Link from 'next/link';
import { Cart } from '../Cart';
import { useRouter } from 'next/router';

export const Header = () => {
  const { pathname } = useRouter();

  const showCartButton = pathname !== '/success';

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt='' />
      </Link>

      {showCartButton && <Cart />}
    </HeaderContainer>
  );
};
