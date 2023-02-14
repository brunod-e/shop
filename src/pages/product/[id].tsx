import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

const Product = ({ product }: ProductProps) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  // const { isFallback } = useRouter();

  // if (isFallback) {
  //   return <p>Carregando...</p>;
  // }

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      // Conectar com o Sentry/DataDog
      alert(error.message);
    }
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

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // RECOMENDADO PARA BUSCAR PELOS 10 MAIS ACESSADOS POR EXEMPLO
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
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

export default Product;
