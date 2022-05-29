import React, { useState } from 'react';
import Head from 'next/head';
import { ProductItem } from '../../components/ProductItem';
import { Header } from '../../components/Header';
import { useProducts } from './../../hooks/useProducts';
import { useRouter } from 'next/router';
import { Ring } from 'react-awesome-spinners';
import { Footer } from './../../components/Footer';

export default function ProductDetails() {
  const [loadingWarning, setLoadingWarning] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const category = (id as string)?.replace('-', ' ');

  const { products, productsLoading, productsError } = useProducts();

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

  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>{category.toUpperCase()}</title>
        <meta name="description" content={`Products in ${category} category`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="grid grid-cols-1 sm:grid-cols-2 h-full p-10 gap-10 lg:px-24 2xl:px-72">
        {filteredProducts?.map((p) => (
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
