import React from 'react';
import Image from 'next/image';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function ProductDetails({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5 p-4 text-center">
      <div className="relative w-52 h-52 bg-white">
        <Image
          src={product.image}
          layout="fill"
          objectFit="contain"
          unoptimized
        ></Image>
      </div>
      <h1>{product.title}</h1>
      <h2>{`$${product.price}`}</h2>
      <p>{product.description}</p>
      <button className="rounded-md bg-yellow-400 p-3 hover:bg-yellow-300">
        Add To Cart
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  return { props: { product } };
};
