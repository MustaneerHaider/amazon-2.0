import moment from 'moment-mini';
import Currency from 'react-currency-formatter';

function Order({ id, amount, amountShipping, images, items, timestamp }) {
	return (
		<div className='relative border rounded-md'>
			<div
				className='flex items-center space-x-10 p-5 bg-gray-100 text-sm 
      text-gray-600'
			>
				<div>
					<p className='font-bold text-xs'>ORDER PLACED</p>
					<p className='text-xs md:text-base'>
						{moment.unix(timestamp).format('DD MMM YYYY')}
					</p>
				</div>

				<div className='flex-1'>
					<p className='font-bold text-xs'>TOTAL</p>
					<p className='text-xs md:text-base'>
						<Currency quantity={amount} currency='GBP' /> - Next-day
						Delivery{' '}
						<Currency quantity={amountShipping} currency='GBP' />
					</p>
				</div>

				<p className='text-sm whitespace-nowrap sm:text-xl text-blue-500'>
					{items.length} items
				</p>

				<p className='absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap'>
					Order # {id}
				</p>
			</div>

			<div className='p-5 sm:p-10'>
				<div className='flex space-x-6 overflow-x-auto'>
					{images.map(image => (
						<img
							src={image}
							className='h-20 object-contain sm:h-32'
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Order;
