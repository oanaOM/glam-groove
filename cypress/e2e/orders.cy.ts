import { mockOrder } from "../../mocks/fixtures"

beforeEach(() => {
	cy.intercept("GET", "/api/orders/12", {
		statusCode: 201,
		body: mockOrder,
	}).as("getOrders")

	cy.visit("http://localhost:3000/orders")
})

describe("Orders page", () => {
	it("should show the page title", () => {
		cy.get("h1").should("contain", "Order")
	})

	it("should allow the user to get the details of an order number", () => {
		cy.get("input").clear().type("12")
		cy.get('[data-cy="order-details-button"]').should("contain", "Get order details").click()
		cy.get("h5").should("contain", "Order number: 12")
		cy.get("div").should("contain", "Product 361")
		cy.get("div").should("contain", "£330.00")
	})

	it("should show an error message if order number doesn't exist", () => {
		cy.intercept("GET", "/api/orders/999", {
			body: { error: "Random error" },
		}).as("getCategoriesError")

		cy.get("input").clear().type("999")
		cy.get('[data-cy="order-details-button"]').should("contain", "Get order details").click()
		cy.get("p").should("contain", "Oops, something went wrong. Please refresh the page")
	})

	it("should show an info message if order number doesn't exist", () => {
		cy.intercept("GET", "/api/orders/999", {
			body: { products: [] },
		}).as("getOrdersEmpty")

		cy.get("input").clear().type("999")
		cy.get('[data-cy="order-details-button"]').should("contain", "Get order details").click()
		cy.get("p").should("contain", "This order doesn't exist. Please try searching for another order number")
	})
})
