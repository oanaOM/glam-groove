interface PageHeadingProps {
	children: React.ReactNode
}

export default function PageHeading({ children }: PageHeadingProps) {
	return <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">{children}</h1>
}
