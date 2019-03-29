INSERT INTO users (name, phone, email, city, state, zip, createdAt, updatedAt)
	VALUES ('Kurt', '555 555-5555', 'kurt@kurt.com', 'Los Angeles', 'CA', 90038, NOW(), NOW()),
		     ('Gladys', '777 777-7777', 'gladys@gladys.com', 'Los Angeles', 'CA', 90042, NOW(), NOW()),
         ('Ariana', '999 999-9999', 'ariana@ariana.com', 'Los Angeles', 'CA', 90057, NOW(), NOW());
           
           
INSERT INTO pets (name, type, gender, age, breed, description, createdAt, UpdatedAt, UserId)
	VALUES ('Magda', 'cat', 'f', 7, 'domestic longhair', 'Constant lap companion', NOW(), NOW(), 2),
				 ('Mr Whiskers', 'cat', 'm', 8, 'domestic shorthair', 'A real sweetie!', NOW(), NOW(), 1),
				 ('Chata', 'dog', 'f', 7, 'maltese', 'Kibble freak', NOW(), NOW(), 1),
				 ('Sassy', 'dog', 'f', 4, 'cocker spaniel', 'Loves cuddles', NOW(), NOW(), 3),
				 ('Rocket', 'cat', 'm', 2, 'tuxedo', 'Always playing', NOW(), NOW(), 2),
				 ('Jimbo', 'dog', 'm', 8, 'siberian husky', 'Good at problem solving', NOW(), NOW(), 2),
				 ('Archimedes', 'dog', 'm', 2, 'pit bull', 'Very loyal', NOW(), NOW(), 3),
				 ('Hal', 'cat', 'm', 11, 'norwegian forest', 'Big fella', NOW(), NOW(), 3),
				 ('Chiclet', 'cat', 'f', 4, 'brown tabby', 'Adventurous', NOW(), NOW(), 2),
				 ('Rimba', 'dog', 'f', 5, 'unknown', 'Lots of energy', NOW(), NOW(), 1);