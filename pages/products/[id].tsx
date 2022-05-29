import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Header } from './../../components/Header';
import { useProduct } from './../../hooks/useProduct';
import { useRouter } from 'next/router';
import { Ring } from 'react-awesome-spinners';
import { Footer } from './../../components/Footer';
import { CartContext } from '../../store/cart-context';

export default function ProductDetails() {
  const router = useRouter();
  const { addProduct, changeTotalAmount } = useContext(CartContext);
  const [loadingWarning, setLoadingWarning] = useState(false);

  const { id } = router.query;
  const { product, productLoading, productError } = useProduct(id);

  const addToCartHandler = () => {
    const productInCart = {
      ...product,
      amount: 1,
      total: Number(product.price),
    };
    addProduct(productInCart);
    changeTotalAmount(1);
  };

  if (productLoading) {
    setTimeout(() => {
      setLoadingWarning(true);
    }, 3000);
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <Ring />
        {loadingWarning && (
          <>
            <p>
              Sometimes Fake Store API is very slow, there's no problem on the
              client side.
            </p>
            <p> Please wait, it will load.</p>
          </>
        )}
      </div>
    );
  }
  if (productError)
    return <p className="text-red-500 text-center">Failed to fetch products</p>;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col justify-around items-center h-full p-10 sm:p-20 text-center gap-4 lg:px-24 2xl:px-72">
        <div className="relative w-36 h-36 sm:w-52 sm:h-52 bg-white">
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            unoptimized
          />
        </div>
        <h1 className="font-bold text-lg sm:text-xl">{product.title}</h1>
        <h2 className="text-orange-600 font-bold text-lg sm:text-xl">{`$${product.price}`}</h2>
        <p>{product.description}</p>
        <button
          onClick={addToCartHandler}
          className="font-bold rounded-md bg-yellow-400 p-3 hover:bg-yellow-300"
        >
          Add To Cart
        </button>
      </main>
      <Footer />
    </div>
  );
}
