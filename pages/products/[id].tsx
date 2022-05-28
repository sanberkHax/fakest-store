import React from 'react';
import Image from 'next/image';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Header } from './../../components/Header';
import { Categories } from './../../components/Categories';

export default function ProductDetails({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center ">
        <Header />
        <Categories />
        <section className="flex flex-col justify-center items-center gap-5 p-4 text-center">
          <div className="relative w-52 h-52 bg-white">
            <Image
              src={product.image}
              layout="fill"
              objectFit="contain"
              unoptimized
            ></Image>
          </div>
          <h1 className="font-bold text-xl">{product.title}</h1>
          <h2 className="text-orange-600 font-bold text-xl">{`$${product.price}`}</h2>
          <p>{product.description}</p>
          <button className="font-bold rounded-md bg-yellow-400 p-3 hover:bg-yellow-300">
            Add To Cart
          </button>
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
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  return { props: { product } };
};
