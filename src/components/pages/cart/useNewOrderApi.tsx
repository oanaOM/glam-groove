import { ProductsInOrderType } from "~/components/types"

export async function createOrder(url: string, { arg }: { arg: { products: ProductsInOrderType[] } }) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(arg),
	}).then((res) => res.json())
}

export async function confirmOrder(url: string, { arg }: { arg: { id: number } }) {
	return fetch(`${url}/${arg}/buy`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res)
}
