import { Dispatch, createContext, useContext, useReducer } from "react"
import { ProductsInCart } from "../types"

interface Action {
	type: string
	product: ProductsInCart
}

export const CartContext = createContext<ProductsInCart[] | null>(null)
export const CartDispatchContext = createContext<Dispatch<Action> | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [products, dispatch] = useReducer(cartReducer, [])

	return (
		<CartContext.Provider value={products}>
			<CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
		</CartContext.Provider>
	)
}

export function cartReducer(products: ProductsInCart[], action: Action) {
	switch (action.type) {
		case "added": {
			const newProduct = products.map((product) => {
				if (product.id === action.product.id) {
					return {
						...product,
						quantity: product.quantity ? product.quantity + 1 : 1,
					}
				}
				return {
					...action.product,
					quantity: 1,
				}
			})

			return [...products, { ...newProduct }]
		}
		case "increment": {
			const newProduct = [
				...products,
				{ ...action.product, quantity: action.product.quantity ? (action.product.quantity += 1) : 1 },
			]
			return newProduct
		}
		case "decrement": {
			const newProduct = [
				...products,
				{ ...action.product, quantity: action.product.quantity ? (action.product.quantity -= 1) : 0 },
			]
			return newProduct
		}
		case "removed": {
			return products.filter((p) => p.id != action.product.id)
		}
		default: {
			throw new Error("Action type doesn't exist " + action.type)
		}
	}
}

export function useCartContext() {
	return useContext(CartContext)
}

export function useCartDispatchContext() {
	return useContext(CartDispatchContext)
}
