beforeEach(() => {
	cy.visit("http://localhost:3000")
})

describe("Home page", () => {
	it("should show the title of the home page", () => {
		cy.get("h1").should("contain", "Welcome to Glam Groove Cosmetics")
	})

	it("should allow the user to navigate to products page", () => {
		cy.get("nav").within(() => cy.get('[href="/products"]').click())

		cy.url().should("contain", "/products")
		cy.get("h1").should("contain", "Products")
	})

	it("should allow the user to navigate to orders page", () => {
		cy.get("nav").within(() => cy.get('[href="/orders"]').click())

		cy.url().should("contain", "/orders")
		cy.get("h1").should("contain", "Order")
	})

	it("should allow the user to navigate to See my cart page", () => {
		cy.get("nav").within(() => cy.get('[href="/cart"]').click())

		cy.url().should("contain", "/cart")
		cy.get("h1").should("contain", "Current cart")
	})
})
