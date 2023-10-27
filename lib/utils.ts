import { Category, Product } from "~/components/types"

export const productsByCategory = (products: Product[], categories: Category[]) =>
	products && categories && categories.length > 0
		? categories.map((category) => {
				return {
					category: category.name,
					products: products.filter((product) => product.category.name === category.name),
				}
		  })
		: []

export const formatCurrencyNumber = (value: number) => `£${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "£1,")}`
