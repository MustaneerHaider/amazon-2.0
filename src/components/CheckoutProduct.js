import {
	StarIcon,
	ChevronUpIcon,
	ChevronDownIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {
	removeFromBasket,
	incrementQuantity,
	decrementQuantity
} from '../slices/basketSlice';

function CheckoutProduct({
	id,
	title,
	price,
	description,
	category,
	image,
	hasPrime,
	rating,
	quantity
}) {
	const dispatch = useDispatch();

	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));
	};

	const incrementItemQuantity = () => {
		dispatch(incrementQuantity({ id }));
	};

	const decrementItemQuantity = () => {
		dispatch(decrementQuantity({ id }));
	};

	return (
		<div className='grid grid-cols-5'>
			<Image src={image} width={200} height={200} objectFit='contain' />

			<div className='col-span-3 mx-5'>
				<p>{title}</p>
				<div className='flex'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className='h-5 text-yellow-500' />
						))}
				</div>

				<p className='text-xs line-clamp-3 my-2'>{description}</p>
				<Currency quantity={price} currency='GBP' />

				{hasPrime && (
					<div className='flex items-center space-x-2'>
						<img
							loading='lazy'
							className='w-12'
							src='https://links.papareact.com/fdw'
							alt=''
						/>
						<p className='text-xs text-gray-500'>
							Free Next-day Delivery
						</p>
					</div>
				)}
			</div>

			<div className='flex flex-col my-auto justify-self-end'>
				<div className='flex justify-between mb-2 border border-gray-300 p-2 rounded-md'>
					<ChevronUpIcon
						onClick={incrementItemQuantity}
						className='icon border-r'
					/>
					<span className='font-bold'>{quantity}</span>
					<ChevronDownIcon
						onClick={decrementItemQuantity}
						className='icon border-l'
					/>
				</div>

				<button onClick={removeItemFromBasket} className='button'>
					Remove from Basket
				</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;
