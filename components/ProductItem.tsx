import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
}
export const ProductItem: React.FC<Props> = ({ id, title, price, image }) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="cursor-pointer flex flex-col justify-center items-center text-center">
        <div className="relative w-40 h-40">
          <Image src={image} layout="fill" objectFit="contain" unoptimized />
        </div>
        <h1>{title}</h1>
        <h2>{price}</h2>
      </div>
    </Link>
  );
};
