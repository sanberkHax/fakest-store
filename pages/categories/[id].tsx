import React from 'react';
import Head from 'next/head';
import { Categories } from '../../components/Categories';
import { ProductItem } from '../../components/ProductItem';
import { Header } from '../../components/Header';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function ProductDetails({
  products,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Head>
        <title>{category.toUpperCase()}</title>
        <meta name="description" content={`Products in ${category} category`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <Header />
        <Categories />
        <section className="grid grid-cols-2 h-full p-10 gap-10">
          {products?.map((p) => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  const category = (id as string).replace('-', ' ');
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const products = await response.json();
  return { props: { products, category } };
};
