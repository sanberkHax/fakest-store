import React from 'react';
import { CartButton } from './CartButton';
import { FavoritesButton } from './FavoritesButton';

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between p-3 px-10 gap-2 items-center w-full h-1/10">
      <h1 className="text-xl">Next JS E-Commerce</h1>
      <div className="flex justify-between gap-5 items-center">
        <FavoritesButton />
        <CartButton />
      </div>
    </div>
  );
};
