create table orders(
    id serial primary key,
    user_id bigint references users(id),
    status varchar(10)
);