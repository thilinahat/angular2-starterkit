create table customer_stage
(
stage_id int NOT NULL AUTO_INCREMENT,
stage varchar(255) NOT NULL,
stage_color varchar(255) NOT NULL,
PRIMARY KEY (stage_id )
);


INSERT INTO `customer_stage` 
(`stage_id`, `stage`, `stage_color`) 
VALUES 
(NULL, 'potential', 'yellow'), 
(NULL, 'pre-sale', 'brown'), 
(NULL, 'existing', 'green'), 
(NULL, 'old', 'brown');

create table client
(
client_id int NOT NULL AUTO_INCREMENT,
company_name varchar(255) NOT NULL,
address varchar(255),
contact_person_name varchar(255),
web_site varchar(255),
stage_id int,
country varchar(255),
town varchar(255),
mlr_number varchar(255),
postal_code varchar(255),
business_registration varchar(255),
logo_file_name varchar(255),
logo blob,
support_time int,
    
PRIMARY KEY (client_id),
FOREIGN KEY (stage_id) REFERENCES customer_stage(stage_id)
);

create table client_mail
(
client_id int ,
mail varchar(255) NOT NULL,    
PRIMARY KEY (client_id,mail),
FOREIGN KEY (client_id) REFERENCES client(client_id)
);


create table client_phone
(
client_id int ,
phone varchar(20) NOT NULL,    
PRIMARY KEY (client_id,phone),
FOREIGN KEY (client_id) REFERENCES client(client_id)
);

create table client_fax
(
client_id int ,
fax varchar(20) NOT NULL,    
PRIMARY KEY (client_id,fax),
FOREIGN KEY (client_id) REFERENCES client(client_id)
);


create table support_contract
(
contract_id int NOT NULL AUTO_INCREMENT,    

contract_file_name varchar(255),
contract blob,
client_id int,    
    
PRIMARY KEY (contract_id),
FOREIGN KEY (client_id) REFERENCES client(client_id)
);

