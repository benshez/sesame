INSERT INTO Country (country_id, tenant_id, description, active) 
VALUES ('RSA', 'public','South Africa', true);

INSERT INTO Event_Type (tenant_id, event_type_name, active) 
VALUES ('public','South Africa', true);

INSERT INTO Organization (tenant_id, name, contact_person, email, active) 
VALUES ('public', 'Ben', 'Ben','benshez@gmail.com', true);

INSERT INTO Venue (tenant_id, capacity, address_line, city, state, postal_code, country, active) 
VALUES ('public', 1000, 'Ben','Meridan Plains', 'QLD', '4551', 'Australia', true);