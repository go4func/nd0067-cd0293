create table orders(
    id serial primary key,
    product_id bigint references products(id),
    user_id bigint references users(id),
    quantity bigint,
    status varchar(10)
)