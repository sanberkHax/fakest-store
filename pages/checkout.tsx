import Head from 'next/head';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from './../components/Footer';
import Link from 'next/link';

export default function Checkout() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Fakest Store</title>
        <meta name="description" content="Fakest store e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col justify-center items-center h-full p-10 sm:p-20 text-center gap-10 lg:px-24 2xl:px-72">
        <h1 className="text-2xl font-bold">Purchase Succesfull!</h1>
        <Link href="/">
          <a className="bg-yellow-400 hover:bg-yellow-300 p-4 font-bold">
            Continue Shopping
          </a>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
