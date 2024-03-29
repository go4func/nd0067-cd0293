# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Auth

- Login: `/login` [POST]

#### Users

- Create: `/users` [POST]
- Index [token required]: `/users` [GET]
- Show [token required]: `/users/:id` [GET]

#### Products

- Create [token required]: `/products` [POST]
- Index: `/products` [GET]
- Show: `/products/:id` [GET]
- Products by category (args: product category): `/products?category={category}` [GET]

#### Orders

- Create order [token required]: `/orders` [POST]
- Add order product [token required]: `/orders/:id/products` [PUT]
- Update order [token required]: `/orders` [PUT]
- Current Orders by user (args: user id)[token required]: `/orders/active` [GET]
- Completed Orders by user (args: user id)[token required]: `/orders/complete` [GET]

#### Dashboard

- Top 5 most popular products: `/five-most-popular` [GET]

## Data Shapes

#### User

table users:

- id serial primary key
- first_name varchar(50)
- last_name varchar(50)
- password varchar(100)

#### Product

table products:

- id serial primary key
- name varchar(100)
- category varchar(50)

#### Orders

table orders:

- id serial primary key,
- user_id int references users(id),
- status varchar(10)

#### Order Products

table order_products:

- order_id int references orders(id),
- product_id int references products(id),
- quantity int
