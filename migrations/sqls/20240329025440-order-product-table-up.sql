create table order_products(
    order_id int references orders(id),
    product_id int references products(id),
    quantity int
);