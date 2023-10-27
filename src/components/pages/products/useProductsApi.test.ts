import useProductApi from "./useProductsApi"
import { rest } from "msw"
import { API_URL } from "../../../../lib/consts"
import { server } from "../../../../mocks/server"
import { renderHook, act, waitFor } from "@testing-library/react"
import { mockCategories, mockGroupByCategory, mockProducts } from "../../../../mocks/fixtures"

describe("useProductApi hook", () => {
	it("should return the list of products and the list of categories", async () => {
		let result: any

		await act(async () => {
			result = renderHook(() => useProductApi())
		})
		await waitFor(() => {
			expect(result.result.current.products).toEqual(mockProducts)
			expect(result.result.current.categories).toEqual(mockCategories)
		})
	})

	it("should return the list of products grouped by category", async () => {
		let result: any

		await act(async () => {
			result = renderHook(() => useProductApi())
		})

		await waitFor(() => {
			expect(result.result.current.groupByCategory).toEqual(mockGroupByCategory)
		})
	})

	it("should handle server error", async () => {
		// intercept the HTTP request
		server.use(
			rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
				return res(ctx.json({ error: "500 Random error" }))
			}),
		)

		server.use(
			rest.get(`${API_URL}/products`, (_req, res, ctx) => {
				return res(ctx.json({ error: "500 Random error" }))
			}),
		)

		let result: any

		await act(async () => {
			result = renderHook(() => useProductApi())
		})
		await waitFor(() => {
			expect(result.result.current.products).toEqual({ error: "500 Random error" })
		})
	})
})
