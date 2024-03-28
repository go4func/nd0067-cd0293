# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Create [token required]: `/products` [POST]
- Index: `/products` [GET]
- Show: `/products/:id` [GET]
- Products by category (args: product category): `/products?category={category}` [GET]

#### Users

- Create: `/users` [POST]
- Index [token required]: `/users` [GET]
- Show [token required]: `/users/:id` [GET]

#### Orders

- Create [token required]: `/orders` [POST]
- Update [token required]: `/orders` [PUT]
- Current Order by user (args: user id)[token required]: `/orders?user_id={user_id}&status=active` [GET]
- Completed Orders by user (args: user id)[token required]: `/orders?user_id={user_id}&status=complete` [GET]

#### Dashboard

- Top 5 most popular products: `/five-most-popular` [GET]

#### Auth

- Login: `/login` [POST]

## Data Shapes

#### Product

table products:

- id serial primary key
- name varchar(100)
- category varchar(50)

#### User

table users:

- id serial primary key
- first_name varchar(50)
- last_name varchar(50)
- password varchar(100)

#### Orders

table orders:

- id serial primary key,
- product_id bigint references products(id),
- user_id bigint references users(id),
- quantity bigint,
- status varchar(10)
