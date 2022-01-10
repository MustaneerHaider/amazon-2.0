import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: []
};

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id
			);
			const newBasket = [...state.items];

			let newQty = 1;
			if (index >= 0) {
				newBasket[index].quantity += newQty;
			} else {
				const product = { ...action.payload, quantity: newQty };
				newBasket.push(product);
			}

			state.items = newBasket;
		},
		removeFromBasket: (state, action) => {
			state.items = state.items.filter(
				item => item.id !== action.payload.id
			);
		},
		incrementQuantity: (state, action) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id
			);

			const newBasket = [...state.items];
			newBasket[index].quantity += 1;

			state.items = newBasket;
		},
		decrementQuantity: (state, action) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id
			);

			const newBasket = [...state.items];
			if (newBasket[index].quantity === 1) {
				newBasket.splice(index, 1);
			} else {
				newBasket[index].quantity -= 1;
			}

			state.items = newBasket;
		}
	}
});

export const {
	addToBasket,
	removeFromBasket,
	incrementQuantity,
	decrementQuantity
} = basketSlice.actions;

// Selectors
export const selectItems = state => state.basket.items;
export const selectTotal = state =>
	state.basket.items.reduce((total, item) => {
		const price = item.price * (item.quantity || 1);
		return total + price;
	}, 0);

export default basketSlice.reducer;
