import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Header } from './../../components/Header';
import { Categories } from './../../components/Categories';
import { useProduct } from './../../hooks/useProduct';
import { useRouter } from 'next/router';
import { Ring } from 'react-awesome-spinners';

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;
  const { product, productLoading, productError } = useProduct(id);

  if (productLoading)
    return (
      <div className="flex justify-center items-center">
        <Ring />
      </div>
    );
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
      <Categories />
      <main className="flex flex-col justify-around items-center h-full p-20 text-center">
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
      </main>
      <footer className="bg-blue-300 p-1 flex justify-around items-center">
        <h2 className="text-lg font-bold">Next JS E-Commerce</h2>
        <h2 className="text-lg font-bold">Sanberk Türker</h2>
      </footer>
    </div>
  );
}
