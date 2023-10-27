import { FormEvent, useState } from "react"
import useOrdersApi from "./useOrdersApi"
import PageHeading from "~/components/common/layout/PageHeading"
import OrderCard from "./OrderCard"
import { Spinner } from "flowbite-react"

export default function Orders() {
	const [orderId, setOrderId] = useState<number>(0)

	const { order, isLoading } = useOrdersApi(orderId)

	async function handleOnSubmit(e: FormEvent) {
		// Prevent the browser from reloading the page
		e.preventDefault()

		// Read the form data
		const formData = new FormData(e.target)

		const form = Object.fromEntries(formData.entries())
		setOrderId(Number(form.orderId))
	}

	return (
		<>
			<PageHeading>Order</PageHeading>
			<div className="container">
				<p>Enter the order number below</p>
				<form className="w-full max-w-sm" method="post" onSubmit={handleOnSubmit}>
					<div className="flex items-center border-b border-teal-500 py-2">
						<input
							className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
							type="number"
							name="orderId"
							placeholder="Enter order number"
							aria-label="Order"
							defaultValue={0}
						/>
						<button
							className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
							type="submit"
							data-cy="order-details-button"
						>
							Get order details
						</button>
					</div>
				</form>
				<div className="my-8 w-9/12">
					{isLoading ? (
						<div className="text-center">
							<Spinner aria-label="Retrieving your order details ..." />
						</div>
					) : order ? (
						<OrderCard order={order} />
					) : null}
				</div>
			</div>
		</>
	)
}
