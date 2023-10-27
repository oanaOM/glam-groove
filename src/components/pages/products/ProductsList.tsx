import { useEffect, useRef, useState } from "react"
import ProductFilter from "./ProductFilter"
import { Category, ProductsInCart } from "~/components/types"
import ProductCard from "./ProductCard"
import Link from "next/link"
import { Alert, Spinner, Toast } from "flowbite-react"
import PageHeading from "~/components/common/layout/PageHeading"
import useProductApi from "./useProductsApi"

export default function ProductsList() {
	const [filter, setFilter] = useState<Category>()
	const initialProductsInCart: ProductsInCart[] =
		typeof window !== "undefined" ? JSON.parse(localStorage.getItem("new-cart") || "[]") : []

	const [productsInCart, setProductsInCart] = useState<ProductsInCart[]>(initialProductsInCart || [])
	const [productAddedToCart, setProductAddedToCart] = useState<boolean>(false)
	const timeoutRef = useRef<number | null>(null)

	const { categories, products, groupByCategory, isLoading } = useProductApi()

	const onFilterOption = (filter: Category) => {
		setFilter(filter)
	}

	const filterByGroupCategory = filter
		? groupByCategory?.filter((product) => product.category === filter.name)
		: groupByCategory

	function handleAddToCart(productId: number) {
		// updatedProductsInCart is responsible to update the quantity of a product if exists in the cart
		const updatedProductsInCart = productsInCart.map((product) => {
			if (product.id === productId) {
				return {
					...product,
					quantity: product.quantity ? product.quantity + 1 : 1,
				}
			}
			return product
		})
		const productToAdd = products?.find((product) => product.id === productId)
		if (!productToAdd) {
			return
		}
		// if product not in cart, update it with quantity 1
		if (!productsInCart.some((product) => product.id === productToAdd.id)) {
			setProductsInCart([...productsInCart, { ...productToAdd, quantity: 1 }])
			setProductAddedToCart(true)
		} else {
			// if product already in cart, update the state of the products in cart
			setProductsInCart(updatedProductsInCart)
			setProductAddedToCart(true)
		}
	}

	useEffect(() => {
		if (productsInCart.length > 0) {
			localStorage.setItem("new-cart", JSON.stringify(productsInCart))
		}

		if (productAddedToCart) {
			timeoutRef.current = setTimeout(() => {
				setProductAddedToCart(false)
			}, 2000) as unknown as number
		}
		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [productsInCart, productAddedToCart])

	return (
		<div className="container">
			<PageHeading>Products</PageHeading>
			{categories && categories.length > 0 && (
				<ProductFilter categories={categories} onFilterOption={onFilterOption} />
			)}
			<div>
				{categories && "error" in categories && (
					<Alert color="failure">
						<span>
							<p>Oops, something went wrong. Please refresh the page.</p>
						</span>
					</Alert>
				)}

				{/* --- show toast for adding a new product to the cart */}
				{productAddedToCart && (
					<Toast className="z-50  fixed right-24">
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
							</svg>
						</div>
						<div className="ml-3 text-sm font-normal">Product added successfully to the cart.</div>
						<Toast.Toggle />
					</Toast>
				)}
				<div className="divide-y divide-gray-200">
					{isLoading ? (
						<div className="text-center">
							<p data-cy="products-loading">
								<Spinner aria-label="Retrieving your order details ..." />
								Loading...{" "}
							</p>
						</div>
					) : (
						filterByGroupCategory.length > 0 &&
						filterByGroupCategory.map((group) => {
							return (
								<div key={group.category}>
									<div className="p-4">
										<Link
											href="#"
											className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
										>
											{group.category}
										</Link>
									</div>
									{group.products.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
											handleAddToCart={() => handleAddToCart(product.id)}
										/>
									))}
								</div>
							)
						})
					)}
				</div>
			</div>
		</div>
	)
}
