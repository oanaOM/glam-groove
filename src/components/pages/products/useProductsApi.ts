import { useEffect, useState } from "react"
import useSWR from "swr"
import { API_URL } from "../../../../lib/consts"
import { fetcher } from "../../../../lib/msw"
import { productsByCategory } from "../../../../lib/utils"
import { Category, Product } from "~/components/types"

export default function useProductApi() {
	const [error, setError] = useState<string>()

	const { data: categories, isLoading: categoriesAreLoading } = useSWR<Category[]>(`${API_URL}/categories`, fetcher, {
		dedupingInterval: 0,
	})

	const { data: products, isLoading: productsAreLoading } = useSWR<Product[]>(
		() => {
			// we fetch the products only if categories exist
			if (categories) {
				return `${API_URL}/products`
			}
			return null
		},
		fetcher,
		{
			dedupingInterval: 0,
		},
	)

	useEffect(() => {
		if (
			(products && "error" in products && products.error === "Random error") ||
			(categories && "error" in categories && categories?.error === "Random error")
		) {
			setError("Random error")
		}
	}, [productsAreLoading, categoriesAreLoading, products, categories])

	const groupByCategory =
		products && !("error" in products) && categories && !("error" in categories)
			? productsByCategory(products, categories)
			: []

	return {
		categories,
		groupByCategory,
		products,
		isLoading: categoriesAreLoading || productsAreLoading,
		error,
	}
}
