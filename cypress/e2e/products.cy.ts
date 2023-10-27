import { mockProducts, mockCategories } from "../../mocks/fixtures"

beforeEach(() => {
	cy.intercept("GET", "/api/categories", {
		statusCode: 201,
		body: mockCategories,
	}).as("getCategories")

	cy.intercept("GET", "/api/products", {
		statusCode: 201,
		body: mockProducts,
	}).as("getProducts")

	cy.visit("http://localhost:3000/products")
})

describe("Products page", () => {
	it("should show the list of products", () => {
		cy.get("h1").should("contain", "Products")
		cy.get("a").should("contain", "Product 32")
		cy.get("a").should("contain", "Product 33")
		cy.get("a").should("not.contain", "Product 34")
	})

	it("should allow the user to select and add products to cart", () => {
		cy.get('[data-cy="32"]').click()
		cy.get("div").should("contain", "Product added successfully to the cart")

		cy.getAllLocalStorage().then((result) => {
			expect(result).to.deep.equal({
				"http://localhost:3000": {
					"new-cart": JSON.stringify([
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
							quantity: 1,
						},
					]),
				},
			})
		})

		cy.get('[data-cy="3"]').click()

		cy.getAllLocalStorage().then((result) => {
			expect(result).to.deep.equal({
				"http://localhost:3000": {
					"new-cart": JSON.stringify([
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
							quantity: 1,
						},
						{
							id: 3,
							name: "Product 3",
							description: "Commodi recusandae porro perspiciatis",
							image: "",
							price: 109,
							category: {
								name: "mask",
								order: 500,
							},
							quantity: 1,
						},
					]),
				},
			})
		})
	})

	it("should show an error message if the products can't be retrieved from the API", () => {
		cy.intercept("GET", "/api/categories", {
			body: { error: "Random error" },
		}).as("getCategoriesError")

		cy.get("p").should("contain", "Oops, something went wrong. Please refresh the page")

		cy.get("a").should("not.contain", "Product 34")
	})

	it("should show a loading icon if there's a delay retrieving the date from the API", () => {
		cy.intercept("GET", "/api/categories", {
			statusCode: 201,
			body: mockCategories,
			delay: 500,
		}).as("getCategories")

		cy.get('[data-cy="products-loading"]').should("contain", "Loading...")
		cy.get("a").should("contain", "Product 32")
	})

	it.only("should add the products to the cart even if there are already products in the cart", () => {
		cy.visit("http://localhost:3000/products", {
			onBeforeLoad: function (window) {
				window.localStorage.setItem(
					"new-cart",
					JSON.stringify([
						{
							id: 12,
							name: "Product 12",
							description: "Commodi recusandae porro perspiciatis",
							image: "",
							price: 108,
							category: {
								name: "oil",
								order: 500,
							},
							quantity: 1,
						},
					]),
				)
			},
		})

		cy.get('[data-cy="32"]').click()
		cy.get("div").should("contain", "Product added successfully to the cart")

		cy.getAllLocalStorage().then((result) => {
			expect(result).to.deep.equal({
				"http://localhost:3000": {
					"new-cart": JSON.stringify([
						{
							id: 12,
							name: "Product 12",
							description: "Commodi recusandae porro perspiciatis",
							image: "",
							price: 108,
							category: {
								name: "oil",
								order: 500,
							},
							quantity: 1,
						},
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
							quantity: 1,
						},
					]),
				},
			})
		})
	})
})
