import React from 'react';
import Head from 'next/head';
import { Categories } from '../../components/Categories';
import { ProductItem } from '../../components/ProductItem';
import { Header } from '../../components/Header';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function ProductDetails({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Next JS E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-full justify-center items-center">
        <Header />
        <Categories />
        <section className="grid h-full grid-cols-2 p-10 gap-10">
          {products?.map((p) => (
            <ProductItem
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              price={p.price}
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
  return { props: { products } };
};
