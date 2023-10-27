import { useState } from "react"
import { Category } from "~/components/types"

interface ProductFilterProps {
	categories: Category[]
	onFilterOption: (newFilter: Category) => void
}

function ProductFilter({ categories, onFilterOption }: ProductFilterProps) {
	const [filterOption, setFilterOption] = useState<string>()

	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newFilter = event.target.value
		if (newFilter) {
			setFilterOption(newFilter)
			onFilterOption({ name: newFilter })
		}
	}

	return (
		<div className="mb-8">
			<select id="filter" value={filterOption} onChange={handleOnChange} className="rounded-2xl mb-4">
				<option>Sort by category</option>
				{categories &&
					categories.length > 0 &&
					categories.map((category, index) => <option key={index}>{category.name}</option>)}
			</select>
		</div>
	)
}

export default ProductFilter
