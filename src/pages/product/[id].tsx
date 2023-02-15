import { ProductType } from '@/context/CartContext';
import { useCart } from '@/hooks/useCart';
import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const { isFallback } = useRouter();

  const { checkIfProductExists, addToCart } = useCart();

  const itemExists = checkIfProductExists(product.id);

  const handleBuyProduct = () => {
    addToCart(product);
  };

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={itemExists} onClick={handleBuyProduct}>
            {itemExists
              ? 'Este produto já está no seu carrinho!'
              : 'Colocar no carrinho'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NLTe6PFZ5SXpJx' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const { id } = params;

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price.unit_amount / 100);

  return {
    props: {
      product: {
        id: product.id,
        sku: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatted,
        description: product.description,
        defaultPriceId: price.id,
        numberPrice: price.unit_amount / 100,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

export default Product;
