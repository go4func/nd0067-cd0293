create table products (
    id serial primary key,
    name varchar(100),
    category varchar(50)
);

create table users (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    password varchar(100)
);

create table orders(
    id serial primary key,
    product_id bigint references products(id),
    user_id bigint references users(id),
    quantity bigint,
    status varchar(10)
);