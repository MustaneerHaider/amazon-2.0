import { getSession, useSession } from 'next-auth/react';
import Header from '../components/Header';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import moment from 'moment-mini';
import Order from '../components/Order';

function Orders({ orders }) {
	const { data: session } = useSession();

	console.log(orders);

	return (
		<div>
			<Header />

			<main className='max-w-screen-lg mx-auto p-10'>
				<h1 className='text-3xl border-b mb-2 pb-1 border-yellow-500'>
					Your Orders
				</h1>

				{session ? (
					<h2>{orders.length} Orders</h2>
				) : (
					<h2>Pleae sign in to see your orders</h2>
				)}

				<div className='mt-5 space-y-4'>
					{orders?.map(
						({
							id,
							amount,
							amountShipping,
							images,
							items,
							timestamp
						}) => (
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								images={images}
								items={items}
								timestamp={timestamp}
							/>
						)
					)}
				</div>
			</main>
		</div>
	);
}

export default Orders;

export async function getServerSideProps(context) {
	const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

	// Get the user logged in credentials...
	const session = await getSession(context);

	if (!session) {
		return {
			props: {}
		};
	}

	// orders from firebase
	const stripeOrders = await getDocs(
		query(
			collection(db, 'users', session.user.email, 'orders'),
			orderBy('timestamp', 'desc')
		)
	);

	// Stripe orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async order => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100
				})
			).data
		}))
	);

	return {
		props: {
			orders,
			session
		}
	};
}
