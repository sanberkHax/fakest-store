import React from 'react';
import Head from 'next/head';
import { Categories } from '../../components/Categories';
import { ProductItem } from '../../components/ProductItem';
import { Header } from '../../components/Header';
import { useProducts } from './../../hooks/useProducts';
import { useRouter } from 'next/router';
import { Ring } from 'react-awesome-spinners';

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const category = (id as string).replace('-', ' ');

  const { products, productsLoading, productsError } = useProducts();

  if (productsLoading)
    return (
      <div className="flex justify-center items-center">
        <Ring />
      </div>
    );

  if (productsError)
    return <p className="text-red-500 text-center">Failed to fetch products</p>;

  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{category.toUpperCase()}</title>
        <meta name="description" content={`Products in ${category} category`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Categories />
      <main className="flex flex-col justify-center items-center h-full">
        <section className="grid grid-cols-2 h-full p-10 gap-10">
          {filteredProducts?.map((p) => (
            <ProductItem
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              price={`$${p.price}`}
            />
          ))}
        </section>
      </main>
      <footer className="bg-blue-300 p-1 flex justify-around items-center">
        <h2 className="text-lg font-bold">Next JS E-Commerce</h2>
        <h2 className="text-lg font-bold">Sanberk Türker</h2>
      </footer>
    </div>
  );
}
