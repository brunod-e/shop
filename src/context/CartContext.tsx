import { createContext, ReactNode, useState } from 'react';

export interface ProductType {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: ProductType[];
  cartTotal: number;
  addToCart: (product: ProductType) => void;
  removeCartItem: (productId: string) => void;
  checkIfProductExists: (productId: string) => boolean;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const cartTotal = cartItems.reduce((acc, product) => {
    return acc + product.numberPrice;
  }, 0);

  const addToCart = (product: ProductType) => {
    setCartItems((state) => [...state, product]);
  };

  const removeCartItem = (productId: string) => {
    setCartItems((state) =>
      state.filter((product) => product.id !== productId)
    );
  };

  const checkIfProductExists = (productId: string) => {
    const productExists = cartItems.some((product) => product.id === productId);

    return productExists;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeCartItem,
        checkIfProductExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
