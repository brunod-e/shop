import { useCallback, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';
import useEmblaCarousel from 'embla-carousel-react';
import { CartButton } from '@/components/CartButton';
import { ProductType } from '@/context/CartContext';
import { Navigate } from '@/components/Navigate';
import { stripe } from '../lib/stripe';
import {
  HomeContainer,
  Product,
  SliderContainer,
  SliderNavigation,
} from '@/styles/pages/home';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '@/components/Skeleton';

interface HomeProps {
  products: ProductType[];
}

const Home = ({ products }: HomeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const { addToCart, checkIfProductExists } = useCart();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductType
  ) => {
    event.preventDefault();
    addToCart(product);
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    // fake loading just for figma
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <SliderNavigation>
        <HomeContainer>
          <div className='embla embla__viewport container' ref={emblaRef}>
            <SliderContainer className='embla__container'>
              {isLoading ? (
                <>
                  <Skeleton className='embla__slide' />
                  <Skeleton className='embla__slide' />
                  <Skeleton className='embla__slide' />
                </>
              ) : (
                <>
                  {products.map((product) => (
                    <Link
                      href={`product/${product.id}`}
                      key={product.id}
                      prefetch={false}
                    >
                      <Product className='embla__slide'>
                        <Image
                          src={product.imageUrl}
                          width={520}
                          height={480}
                          alt=''
                        />
                        <footer>
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                          </div>
                          <CartButton
                            color={'green'}
                            size='large'
                            onClick={(event) => handleAddToCart(event, product)}
                            disabled={checkIfProductExists(product.id)}
                          />
                        </footer>
                      </Product>
                    </Link>
                  ))}
                </>
              )}
            </SliderContainer>
          </div>
        </HomeContainer>
        <Navigate
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
          direction='prev'
        />
        <Navigate
          onClick={scrollNext}
          enabled={nextBtnEnabled}
          direction='next'
        />
      </SliderNavigation>
    </>
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
    }).format(price.unit_amount / 100);

    return {
      id: product.id,
      sku: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatted,
      description: product.description,
      defaultPriceId: price.id,
      numberPrice: price.unit_amount / 100,
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
