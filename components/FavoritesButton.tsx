import React from 'react';
import { useRouter } from 'next/router';

export const FavoritesButton: React.FC = () => {
  const router = useRouter();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/favorites');
  };

  return (
    <button
      onClick={clickHandler}
      className="flex items-center justify-center gap-2 hover:fill-red-500 hover:text-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-10"
      >
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
      </svg>
      <h1 className="text-xl">Favorites</h1>
    </button>
  );
};
