import Header from "./Header"

interface SecondaryLayoutProps {
	children: React.ReactNode
}

export default function SecondaryLayout({ children }: SecondaryLayoutProps) {
	return (
		<div className="h-full">
			<Header />
			<div className="relative isolate px-6 pt-14 lg:px-8 h-screen">
				<div className="mx-auto max-w-5xl py-16 sm:py-24 lg:py-38">
					<div className="text-left">{children}</div>
				</div>
			</div>
		</div>
	)
}
