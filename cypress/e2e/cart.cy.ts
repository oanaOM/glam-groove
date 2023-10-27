beforeEach(() => {
	cy.intercept("POST", "/api/orders", { id: "10" }).as("setOrder")
	cy.intercept("POST", "/api/orders/10/buy", { id: "10" }).as("setOrderConfirmation")

	cy.visit("http://localhost:3000/cart", {
		onBeforeLoad: function (window) {
			window.localStorage.setItem(
				"new-cart",
				JSON.stringify([
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
			)
		},
	})
})

describe("Cart page", () => {
	it("should show the page title", () => {
		cy.get("h1").should("contain", "Current cart")
	})

	it("should show a message if cart is empty", () => {
		cy.visit("http://localhost:3000/cart")
		cy.get("p").should("contain", "Cart is empty.")
	})

	it("should display the products added to the cart", () => {
		cy.get("a").should("contain", "Product 32")
		cy.get("a").should("contain", "Product 3")
	})

	it("should allow the user to change the quantity of a product", () => {
		// increment
		cy.get('[data-cy="32-box"]').within(() => cy.get('[data-cy="increment-quantity-button"]').click())

		cy.get('[data-cy="32-box"]').within(() => cy.get('[data-cy="quantity"]').should("contain", "2"))

		// decrement
		cy.get('[data-cy="32-box"]').within(() => cy.get('[data-cy="decrement-quantity-button"]').click())

		cy.get('[data-cy="32-box"]').within(() => cy.get('[data-cy="quantity"]').should("contain", "1"))
	})

	it("should allow the user to remove a product from the cart", () => {
		cy.get('[data-cy="32-box"]').within(() =>
			cy.get('[data-cy="32-remove-item"]').should("contain", "Remove item").click(),
		)

		cy.getAllLocalStorage().then((result) => {
			expect(result).to.deep.equal({
				"http://localhost:3000": {
					"new-cart": JSON.stringify([
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

	it("should allow the user to purchase the order", () => {
		cy.get("button").contains("Purchase").click()

		cy.get("h3").should("contain", "Order number 10 has been successfully placed")
	})
})
