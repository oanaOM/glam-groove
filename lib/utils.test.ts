import { mockCategories, mockGroupByCategory, mockProducts, mockProductsNoCategoryMatch } from "../mocks/fixtures"
import { productsByCategory } from "./utils"

describe("productByCategory()", () => {
	it("should return an object with products grouped by categories if any matches", () => {
		expect(productsByCategory(mockProducts, mockCategories)).toStrictEqual(mockGroupByCategory)
	})

	it("should return an empty object is no products match the category", () => {
		expect(productsByCategory(mockProductsNoCategoryMatch, mockCategories)).toStrictEqual([
			{ category: "oil", products: [] },
			{ category: "mask", products: [] },
			{ category: "cleanser", products: [] },
			{ category: "lotion", products: [] },
		])
	})
})
