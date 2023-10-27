import { Alert, Badge, Card } from "flowbite-react"
import { Order } from "~/components/types"
import { formatCurrencyNumber } from "../../../../lib/utils"
import DateAndTime from "~/components/common/DateAndTime"

interface OrderCardProps {
	order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
	return (
		<Card>
			{order && "error" in order && (
				<Alert color="failure">
					<span>
						<p>Oops, something went wrong. Please refresh the page.</p>
					</span>
				</Alert>
			)}
			{!!order.products && order.products.length == 0 && (
				<Alert color="success">
					<span>
						Info alert!
						<p>This order doesn&apos;t exist. Please try searching for another order number.</p>
					</span>
				</Alert>
			)}

			{!!order.products && order.products.length > 0 && (
				<>
					<div className="mb-4 flex flex-col md:flex-row items-center justify-between">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
							Order number: {order.id}
						</h5>
						<DateAndTime date={order.createdAt} />

						<Badge color="green">{order.status}</Badge>
					</div>
					<div className="flow-root">
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							{!!order.products &&
								order.products.map((product, index) => (
									<li key={index} className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="shrink-0">{product.product.name}</div>
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
													{product.product.description}
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
												{formatCurrencyNumber(product.product.price)}
											</div>
										</div>
									</li>
								))}
						</ul>
					</div>
				</>
			)}
		</Card>
	)
}
