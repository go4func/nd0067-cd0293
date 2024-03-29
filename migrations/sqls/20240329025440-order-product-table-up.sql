create table order_products(
    order_id bigint references orders(id),
    product_id bigint references products(id),
    quantity bigint
);