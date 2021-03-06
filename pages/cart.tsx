import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Footer } from './../components/Footer';
import { CartContext } from './../store/cart-context';
import { CartItem } from '../components/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cart() {
  const {
    productsInCart,
    calcTotalPrice,
    updateTotalAmount,
    totalPrice,
    resetCart,
  } = useContext(CartContext);

  useEffect(() => {
    calcTotalPrice();
    updateTotalAmount();
  }, [productsInCart]);

  const router = useRouter();

  const checkoutHandler = () => {
    resetCart();
    router.push('/checkout');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Fakest Store</title>
        <meta name="description" content="Fakest store e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-1 p-10 gap-10 justify-center items-center lg:px-24 2xl:px-72">
        {productsInCart.length > 0 ? (
          <div className="border-black border-4 flex-1 h-full p-10 rounded-md flex flex-col text-center items-center gap-4">
            <ul className="rounded-md flex flex-col gap-4">
              {productsInCart.map((p) => (
                <CartItem
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  amount={p.amount}
                  total={p.total}
                />
              ))}
            </ul>
            <p className="font-bold">Total Price:${totalPrice}</p>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 rounded-md p-3 font-bold "
              onClick={checkoutHandler}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center gap-10">
            <p>There are no products in your cart.</p>
            <Link href="/">
              <a className="bg-yellow-400 hover:bg-yellow-300 p-4 font-bold">
                Start Shopping!
              </a>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
