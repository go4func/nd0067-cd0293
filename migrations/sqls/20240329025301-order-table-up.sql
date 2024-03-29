create table orders(
    id serial primary key,
    user_id int references users(id),
    status varchar(10)
);