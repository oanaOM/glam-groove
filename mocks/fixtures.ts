import { Status } from "../src/components/types"

export const mockCategories = [{ name: "oil" }, { name: "mask" }, { name: "cleanser" }, { name: "lotion" }]

export const mockProducts = [
	{
		id: 3,
		name: "Product 3",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 109,
		category: { name: "mask", order: 500 },
	},
	{
		id: 1,
		name: "Product 1",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "lotion", order: 500 },
	},
	{
		id: 32,
		name: "Product 32",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "oil", order: 500 },
	},
	{
		id: 33,
		name: "Product 33",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "oil", order: 500 },
	},
	{
		id: 334,
		name: "Product 33",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "cleanser", order: 500 },
	},
]
export const mockProductsNoCategoryMatch = [
	{
		id: 3,
		name: "Product 3",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "body", order: 500 },
	},
	{
		id: 1,
		name: "Product 1",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: { name: "face", order: 500 },
	},
]

export const mockGroupByCategory = [
	{
		category: "oil",
		products: [
			{
				id: 32,
				name: "Product 32",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "oil", order: 500 },
			},
			{
				id: 33,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 109,
				category: { name: "oil", order: 500 },
			},
			{
				id: 35,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "oil", order: 500 },
			},
			{
				id: 36,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "oil", order: 500 },
			},
			{
				id: 37,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "oil", order: 500 },
			},
		],
	},
	{
		category: "mask",
		products: [
			{
				id: 3,
				name: "Product 3",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "mask", order: 500 },
			},
		],
	},
	{
		category: "cleanser",
		products: [
			{
				id: 334,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "cleanser", order: 500 },
			},
			{
				id: 335,
				name: "Product 33",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "cleanser", order: 350 },
			},
		],
	},
	{
		category: "lotion",
		products: [
			{
				id: 1,
				name: "Product 1",
				description: "Commodi recusandae porro perspiciatis",
				image: "",
				price: 106,
				category: { name: "lotion", order: 500 },
			},
		],
	},
]

export const mockOrder = {
	id: 12,
	createdAt: "2023-09-19T10:29:22.484Z",
	status: Status.Cart,
	products: [
		{
			quantity: 1,
			product: {
				id: 361,
				name: "Product 361",
				description: "Ipsum sunt voluptatum at eveniet.",
				image: "https://picsum.photos/seed/Ok6xSYMSvv/600/600",
				price: 330,
				category: { name: "Lotion", order: 400 },
			},
		},
	],
}

export const mockCart = [
	{
		id: 32,
		name: "Product 32",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: {
			name: "oil",
			order: 500,
		},
		quantity: 3,
	},
	{
		id: 33,
		name: "Product 33",
		description: "Commodi recusandae porro perspiciatis",
		image: "",
		price: 106,
		category: {
			name: "oil",
			order: 500,
		},
		quantity: 3,
	},
]

export const mockNewOrder = {
	products: [{ id: 3, quantity: 2 }],
}
