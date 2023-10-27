import { act, renderHook, waitFor } from "@testing-library/react"
import { mockOrder } from "../../../../mocks/fixtures"
import useOrdersApi from "./useOrdersApi"

describe("useOrdersApi()", () => {
	it("should return the details of an order", async () => {
		let result: any

		await act(async () => {
			result = renderHook(() => useOrdersApi(mockOrder.id))
		})
		await waitFor(() => {
			expect(result.result.current.order).toEqual(mockOrder)
		})
	})
})
