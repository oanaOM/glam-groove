import { rest } from "msw"
import { Category, Order, Product } from "~/components/types"
import { API_URL } from "../lib/consts"
import { mockCategories, mockOrder, mockProducts } from "./fixtures"

export const handlers = [
	rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
		return res(ctx.json<Category[]>(mockCategories))
	}),
	rest.get(`${API_URL}/products`, (_req, res, ctx) => {
		return res(ctx.json<Product[]>(mockProducts))
	}),
	rest.get(`${API_URL}/orders/${mockOrder.id}`, (_req, res, ctx) => {
		return res(ctx.json<Order>(mockOrder))
	}),
]
