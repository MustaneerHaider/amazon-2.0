import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { getSession, useSession } from 'next-auth/react';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
	const items = useSelector(selectItems);
	const total = useSelector(selectTotal);
	const { data: session } = useSession();

	const createCheckoutSession = async () => {
		const stripe = await stripePromise;

		// call backend to create a checkout session...
		const checkoutSession = await axios.post(
			'/api/create-checkout-session',
			{
				items,
				email: session.user.email
			}
		);

		// Redirect the user to Stripe Checkout
		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id
		});

		if (result.error) {
			alert(result.error.message);
		}
	};

	return (
		<div className='bg-gray-100'>
			<Header />

			<main className='lg:flex max-w-screen-2xl mx-auto'>
				{/* Left */}
				<section className='flex-grow m-5 shadow-sm'>
					<Image
						src='https://links.papareact.com/ikj'
						width={1020}
						height={250}
						objectFit='contain'
					/>

					<div className='flex flex-col p-5 space-y-10 bg-white'>
						<h1 className='text-3xl border-b pb-4'>
							{items.length === 0
								? 'Your Basket is empty.'
								: 'Your Shopping Basket'}
						</h1>

						{items.map(
							({
								id,
								title,
								price,
								description,
								category,
								image,
								hasPrime,
								rating,
								quantity
							}) => (
								<CheckoutProduct
									key={id}
									id={id}
									title={title}
									price={price}
									description={description}
									category={category}
									image={image}
									hasPrime={hasPrime}
									rating={rating}
									quantity={quantity}
								/>
							)
						)}
					</div>
				</section>

				{/* Right */}
				<section className='bg-white flex flex-col p-10 shadow-md'>
					{items.length > 0 && (
						<>
							<h2 className='whitespace-nowrap'>
								Subtotal ({items.length} items):{' '}
								<span className='font-bold'>
									<Currency quantity={total} currency='GBP' />
								</span>
							</h2>

							<button
								onClick={createCheckoutSession}
								role='link'
								disabled={!session}
								className={`button mt-2 ${
									!session &&
									'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
								}`}
							>
								{!session
									? 'Sign in to checkout'
									: 'Proceed to checkout'}
							</button>
						</>
					)}
				</section>
			</main>
		</div>
	);
}

export default Checkout;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: { session }
	};
}
