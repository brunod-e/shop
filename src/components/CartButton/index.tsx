import { Handbag } from 'phosphor-react';
import { ComponentProps } from 'react';
import { CartButtonContainer } from './styles';

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export const CartButton = ({ ...props }: CartButtonProps) => {
  return (
    <CartButtonContainer {...props}>
      <Handbag weight='bold' />
    </CartButtonContainer>
  );
};
