import React from 'react';
import Link from 'next/link';

export const Categories: React.FC = () => {
  return (
    <ul className="flex justify-around gap-5 p-4">
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/electronics">
          <a>Electronics</a>
        </Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/jewelery">
          <a>Jewelery</a>
        </Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/men's-clothing">
          <a>Men's Clothing</a>
        </Link>
      </li>
      <li className="cursor-pointer hover:font-bold">
        <Link href="/categories/women's-clothing">
          <a>Women's Clothing</a>
        </Link>
      </li>
    </ul>
  );
};
