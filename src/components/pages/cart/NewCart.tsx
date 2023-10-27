import { useEffect, useState } from "react"
import { ProductsInCart, ProductsInOrderType } from "../../types"
import ProductCard from "../products/ProductCard"
import Link from "next/link"
import { Button, Modal } from "flowbite-react"
import PageHeading from "~/components/common/layout/PageHeading"
import { API_URL } from "../../../../lib/consts"
import { confirmOrder, createOrder } from "./useNewOrderApi"
import useSWRMutation from "swr/mutation"
import { createPortal } from "react-dom"

export default function NewCart() {
	const [productsInCart, setProductsInCart] = useState<ProductsInCart[]>([])
	const [updatedCart, setUpdatedCart] = useState<boolean>(false)
	const [toggleConfirmationOrder, setToggleConfirmationOrder] = useState<boolean>(false)
	const [newOrderId, setNewOrderId] = useState<number>()

	function handleIncrementQuantity(productId: number) {
		setProductsInCart(
			productsInCart.map((product) => {
				if (product.id === productId) {
					return {
						...product,
						quantity: product.quantity ? product.quantity + 1 : 1,
					}
				} else {
					return product
				}
			}),
		)
		setUpdatedCart(true)
	}

	function handleDecrementQuantity(productId: number) {
		setProductsInCart(
			productsInCart.map((product) => {
				if (product.id === productId) {
					return {
						...product,
						quantity: product.quantity ? product.quantity - 1 : 0,
					}
				} else {
					return product
				}
			}),
		)
		setUpdatedCart(true)
	}

	function handleRemoveItem(productId: number) {
		setProductsInCart(productsInCart.filter((product) => product.id !== productId))
		setUpdatedCart(true)
	}

	const { trigger: createNewOrder } = useSWRMutation(`${API_URL}/orders`, createOrder)

	const { trigger: confirmNewOrder } = useSWRMutation(`${API_URL}/orders`, confirmOrder)

	const handlePlaceOrder = async () => {
		const orderPayload: ProductsInOrderType[] = productsInCart
			.filter((product) => product.quantity !== undefined && product.quantity > 0)
			.map(({ id, quantity }) => ({ id, quantity: quantity || 1 }))

		try {
			const resultNewOrder = await createNewOrder({
				products: orderPayload,
			})

			const resultConfirmOrder = await confirmNewOrder(resultNewOrder.id)

			if (resultNewOrder) {
				setNewOrderId(resultNewOrder.id)
			}
			if (!("error" in resultConfirmOrder)) {
				setToggleConfirmationOrder(true)
			}
		} catch (err) {
			console.error("Ops, something went wrong when creating the order", err)
		}
	}

	const clearCart = () => localStorage.removeItem("new-cart")

	/**
	 * we use two use effects below to separate concerns
	 * 1st - runs once after the initial render: gets the data from the local storage
	 * 2nd - runs whenever the state of the cart changes
	 *  */
	useEffect(() => {
		const newCart = localStorage.getItem("new-cart")
		if (newCart) {
			setProductsInCart(JSON.parse(newCart))
		}
	}, [updatedCart])

	useEffect(() => {
		if (updatedCart) {
			localStorage.setItem("new-cart", JSON.stringify(productsInCart))
			setUpdatedCart(false)
		}
	}, [updatedCart, productsInCart])

	return (
		<>
			<PageHeading>Current cart</PageHeading>
			<div>
				{productsInCart.length === 0 && (
					<div>
						<p className="px-2 py-8 text-current">Cart is empty.</p>
						<Link
							href="/products"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Add products
						</Link>
					</div>
				)}
				{productsInCart.length > 0 &&
					productsInCart.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							handleIncrementQuantity={() => handleIncrementQuantity(product.id)}
							handleDecrementQuantity={() => handleDecrementQuantity(product.id)}
							handleRemoveItem={() => handleRemoveItem(product.id)}
						/>
					))}
			</div>
			<div className="flex justify-end">
				<Button color="blue" onClick={handlePlaceOrder} disabled={productsInCart.length === 0}>
					Purchase
				</Button>
			</div>

			{typeof window === "object" &&
				createPortal(
					<div>
						<Modal
							show={toggleConfirmationOrder}
							size="md"
							popup
							onClose={() => setToggleConfirmationOrder(false)}
						>
							<Modal.Header />
							<Modal.Body>
								<div className="text-center">
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Order number {newOrderId} has been successfully placed! 🎉
									</h3>
									<div className="flex justify-center gap-4">
										<Button
											color="success"
											onClick={() => {
												setToggleConfirmationOrder(false)
												clearCart()
											}}
										>
											Continue
										</Button>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</div>,
					document.body,
				)}
		</>
	)
}
