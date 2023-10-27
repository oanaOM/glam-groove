import Link from "next/link"
import MainLayout from "~/components/common/layout/MainLayout"

export default function AnotherHome() {
	return (
		<MainLayout>
			<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Welcome to Glam Groove Cosmetics
			</h1>

			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Link
					href="/products"
					className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
				>
					See products
				</Link>
				<Link href="/orders" className="text-sm font-semibold leading-6 text-gray-900">
					See orders <span aria-hidden="true">→</span>
				</Link>
			</div>
		</MainLayout>
	)
}
