# Welcome to Glam Groove Cosmetics

Our online shop that offers you products to make you feel glamourous.

## About

This online shop offers the following features:

-   on the Products page
    i. List the products grouped by category.
    ii. Products can be added to a new order
-   on Order view
    i. Search for an order id and list the products added to that given order
-   on the Cart view
    ii. User should be able to change the quantity of products
    iii. User should be able to buy the order. Upon a successful purchase, the user will see a confirmation toast

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

We are using `jest` for unit tests and `cypress` for integration tests.

Run unit tests

```bash
yarn test
```

Run e2e tests

```bash
yarn test:e2e
```

### MSW

[MSW](https://mswjs.io/) is available if needed for mocks during tests. To run the app using the mocks set `NEXT_PUBLIC_API_MOCKING=enabled`

---

### Other libraries used

-   [SWR](https://swr.vercel.app/) - for making the HTTP request to retrieve/update the data
-   [Flowbite React](https://www.flowbite-react.com/docs/getting-started/introduction) - as a system design library
-   [Heroicons](https://heroicons.com/)
