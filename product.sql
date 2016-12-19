create table products
(
product_Id int not null AUTO_INCREMENT,
name varchar(255),
description varchar(255),
PRIMARY KEY (product_Id)    
);

create table branch
(
branch_id int not null AUTO_INCREMENT,
client_id int,
name varchar(255),
location varchar(255),
    
PRIMARY KEY (branch_id),
FOREIGN KEY (client_id) REFERENCES client(client_id)    
);

create table till
(
    
till_id int not null AUTO_INCREMENT,
branch_id int,

product_Id int,    
name varchar(255),
till_key varchar(255),
expire_date DATE,
    
PRIMARY KEY (till_id),
FOREIGN KEY (branch_id) REFERENCES branch(branch_id),

FOREIGN KEY (product_Id) REFERENCES products(product_Id)        
);


create table call_record(
call_id int not null AUTO_INCREMENT,
start_time DATETIME,
end_time DATETIME,
description varchar(1250),
time_duration int,
client_id int,

PRIMARY KEY (call_id ),
FOREIGN KEY (client_id) REFERENCES client(client_id)    

);
