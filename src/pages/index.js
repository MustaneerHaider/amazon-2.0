import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

export default function Home({ products }) {
	return (
		<div className='bg-gray-100'>
			<Head>
				<title>Amazon Clone</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='max-w-screen-2xl mx-auto'>
				<Banner />
				<ProductFeed products={products} />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const products = await fetch('https://fakestoreapi.com/products').then(
		res => res.json()
	);
	const session = await getSession(context);

	return {
		props: {
			products,
			session
		}
	};
}
