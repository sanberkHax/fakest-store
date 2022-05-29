import Head from 'next/head';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ProductItem } from '../components/ProductItem';
import { useProducts } from './../hooks/useProducts';
import { Ring } from 'react-awesome-spinners';
import { Footer } from './../components/Footer';

export default function Home() {
  const { products, productsLoading, productsError } = useProducts();
  const [loadingWarning, setLoadingWarning] = useState(false);

  if (productsLoading) {
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
  if (productsError)
    return <p className="text-red-500 text-center">Failed to fetch products</p>;

  return (
    <div className="flex flex-col">
      <Head>
        <title>Fakest Store</title>
        <meta name="description" content="Fakest store e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="grid grid-cols-1 sm:grid-cols-2 p-10 gap-10 justify-center items-center lg:px-24 2xl:px-72">
        {products?.map((p) => (
          <ProductItem
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.image}
            price={`$${p.price}`}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
