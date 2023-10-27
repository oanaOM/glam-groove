export type Category = {
	name: string
}

export type Product = {
	id: number
	name: string
	description: string
	image: string
	price: number
	category: Category
}

export interface ProductsInCart extends Product {
	quantity?: number
}

export type ErrorAPI = {
	error: string
}

export enum Status {
	Cart = "CART",
	Purchased = "PURCHASED",
}

export type Order = {
	id: number
	createdAt: string
	status: Status
	products: {
		quantity: number
		product: Product
	}[]
}

export type ProductsInOrderType = {
	id: number
	quantity: number
}
