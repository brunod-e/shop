import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from 'phosphor-react';
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
import ImageTeste from '../../assets/t-shirt5.png';

export const Cart = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Overlay />
      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X weight='bold' />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {/* <p>Parece que seu carrinho está vazio...</p> */}

            <CartProduct>
              <CartProductImage>
                <Image width={96} height={96} alt='' src={ImageTeste} />
              </CartProductImage>
              <CartProductDetails>
                <p>Produto 1</p>
                <strong>R$ 99,99</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
          </section>

          <CartInfos>
            <CartInfosTotal>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>
              <div>
                <span>ValorTotal</span>
                <p>R$ 199,98</p>
              </div>
            </CartInfosTotal>
            <button>Finalizar compra</button>
          </CartInfos>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
