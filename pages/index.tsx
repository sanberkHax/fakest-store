import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { ProductItem } from '../components/ProductItem';
import { Categories } from './../components/Categories';

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Next JS E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <Header />
        <Categories />
        <section className="grid grid-cols-2 p-10 gap-10">
          {products?.map((p) => (
            <ProductItem
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              price={p.price}
            />
          ))}
        </section>
      </main>
      <footer className="bg-blue-300 p-1 flex justify-around items-center">
        <h2 className="text-lg font-bold">Next JS E-Commerce</h2>
        <h2 className="text-lg font-bold">Sanberk Türker</h2>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  return { props: { products } };
};
