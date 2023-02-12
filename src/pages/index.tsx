import { GetStaticProps } from 'next';
import { HomeContainer, Product } from '@/styles/pages/home';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';

import 'keen-slider/keen-slider.min.css';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

const Home = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides: { perView: 3, spacing: 48 },
  });

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map((product) => (
        <Product key={product.id} className='keen-slider__slide'>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    const priceFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((price.unit_amount as number) / 100);

    return {
      id: product.id,
      sku: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatted,
    };
  });

  return {
    props: {
      products: products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

export default Home;
