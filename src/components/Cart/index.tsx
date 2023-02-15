import { useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { CartButton } from '../CartButton';
import {
  CartClose,
  CartContent,
  CartInfos,
  CartInfosTotal,
  CartProduct,
  CartProductDetails,
  CartProductImage,
} from './styles';

export const Cart = () => {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const { cartItems, cartTotal, removeCartItem } = useCart();
  const cartQuantity = cartItems.length;
  const isCartEmpty = cartQuantity === 0;

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal);

  const handleCheckout = async () => {
    try {
      setIsCreatingCheckout(true);
      const response = await axios.post('/api/checkout', {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckout(false);
      alert('O checkout falhou, tente novamente mais tarde.');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton quantity={cartQuantity} />
      </Dialog.Trigger>

      <Dialog.Overlay />
      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X weight='bold' />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {isCartEmpty && <p>Parece que seu carrinho está vazio...</p>}
            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    width={96}
                    height={96}
                    alt=''
                    src={cartItem.imageUrl}
                  />
                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartInfos>
            <CartInfosTotal>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}
                </p>
              </div>
              <div>
                <span>ValorTotal</span>
                <p>{formattedTotal}</p>
              </div>
            </CartInfosTotal>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckout || cartQuantity <= 0}
            >
              Finalizar compra
            </button>
          </CartInfos>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
