import { Handbag } from 'phosphor-react';
import { ComponentProps } from 'react';
import { CartButtonContainer } from './styles';

interface CartButtonProps extends ComponentProps<typeof CartButtonContainer> {
  quantity?: number;
}

export const CartButton = (props: CartButtonProps) => {
  const { quantity } = props;
  const hasItem = quantity > 0;

  return (
    <CartButtonContainer {...props}>
      <Handbag weight='bold' />
      {hasItem && <span>{quantity}</span>}
    </CartButtonContainer>
  );
};
