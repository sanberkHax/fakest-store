import React from 'react';
import Link from 'next/link';

export const Categories: React.FC = () => {
  return (
    <ul className="flex justify-around gap-5">
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/electronics">Electronics</Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/jewelery">Jewelery</Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/men's-clothing">Men's Clothing</Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/women's-clothing">Women's Clothing</Link>
      </li>
    </ul>
  );
};
