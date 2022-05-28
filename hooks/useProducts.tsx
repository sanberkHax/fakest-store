import useSWR from 'swr';

type Products = [
  {
    createdAt: string;
    id: number;
    title: string;
    image: string;
    category: string;
    description: string;
    price: string;
  }
];

export const useProducts = (): {
  products: Products;
  productsLoading: boolean;
  productsError: { message: string };
} => {
  const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error: any = new Error(
        'An error occurred while fetching the data.'
      );

      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };
  const { data, error } = useSWR('https://fakestoreapi.com/products', fetcher);

  return {
    products: data,
    productsLoading: !error && !data,
    productsError: error,
  };
};
