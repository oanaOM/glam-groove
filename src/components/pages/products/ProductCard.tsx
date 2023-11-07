import { ProductsInCart } from "~/components/types"
import Image from "next/image"
import { Badge, Button } from "flowbite-react"
import { formatCurrencyNumber } from "../../../../lib/utils"

interface ProductCardProps {
	product: ProductsInCart
	handleAddToCart?: () => void
	handleIncrementQuantity?: () => void
	handleDecrementQuantity?: () => void
	handleRemoveItem?: () => void
}

function ProductCard({
	product,
	handleAddToCart,
	handleIncrementQuantity,
	handleDecrementQuantity,
	handleRemoveItem,
}: ProductCardProps) {
	return (
		<div className="container">
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
				<div className="md:flex">
					<div className="md:shrink-0">
						<Image
							className="h-48 w-full object-cover md:h-full md:w-48"
							src="https://picsum.photos/seed/3VHmA/600/600"
							alt="Modern building architecture"
							width={300}
							height={300}
						/>
					</div>
					<div className="p-8 w-full">
						<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
							{product.category.name}
						</div>
						<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
							{product.name}
						</a>
						<div data-cy={`${product.id}-box`}>
							<p className="mt-2 text-slate-500">{product.description}</p>
							<p className="mt-2 text-slate-500">{formatCurrencyNumber(product.price)}</p>
							{handleAddToCart && (
								<div className="text-right ">
									<button
										role="button"
										onClick={handleAddToCart}
										className="bg-sky-500 px-4 py-2 rounded-md text-white my-4"
										data-cy={product.id}
									>
										Add to cart
									</button>
								</div>
							)}
							{product.quantity && (
								<p>
									Quantity:{" "}
									<button
										className="px-2 bg-slate-200 m-2 rounded-lg"
										onClick={handleIncrementQuantity}
										data-cy="increment-quantity-button"
									>
										+
									</button>{" "}
									<span data-cy="quantity">{product.quantity} </span>
									<button
										className="px-2 m-2 bg-slate-200 rounded-lg"
										onClick={handleDecrementQuantity}
										data-cy="decrement-quantity-button"
									>
										-
									</button>
								</p>
							)}
							{handleRemoveItem && (
								<div className="my-4">
									<Button
										color="failure"
										role="button"
										onClick={handleRemoveItem}
										data-cy={`${product.id}-remove-item`}
									>
										Remove item
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="p-4"></div>
		</div>
	)
}

export default ProductCard
