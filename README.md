# purrfectAirtable

Project: API + View of results stored in [Airtable](https://airtable.com/app8wLQrrIMrnn673).

## Run steps

- To build and run Docker containers: `docker compose build && docker compose up`
- Once docker is running successfully, open in your browser: `http://localhost:3000/`

## Client view

Two sections:

- **Stats**: Four cards with requested data: _total revenue, number of orders with status in_progress, number of orders placed this month, total number of orders_.
- **Last orders**: List of `n` cards with data from last placed orders.

## Server

5 API endpoints to retrieve requested data: _total revenue, number of orders with status in_progress, number of orders placed this month, total number of orders, last placed orders_.

> Two endpoints are broken, as they need the `Formula` field and the API documentation is not very explanatory on how to use such field. Returning a `0` by default and omiting the error received from Airtable.
