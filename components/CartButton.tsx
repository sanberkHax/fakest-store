import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from './../store/cart-context';

export const CartButton: React.FC = () => {
  const router = useRouter();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/cart');
  };
  const { totalAmount } = useContext(CartContext);

  return (
    <button
      onClick={clickHandler}
      className="flex items-center justify-center gap-2 hover:fill-white hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 sm:w-10"
      >
        <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
      </svg>
      <h1 className="text-xl hidden sm:block">Cart</h1>
      <p>{totalAmount}</p>
    </button>
  );
};
