INSERT INTO users (name, phone, email, createdAt, updatedAt)
	VALUES ('Kurt', '555 555-5555', 'kurt@kurt.com', NOW(), NOW()),
		     ('Gladys', '777 777-7777', 'gladys@gladys.com', NOW(), NOW()),
         ('Ariana', '999 999-9999', 'ariana@ariana.com', NOW(), NOW());
           
           
INSERT INTO pets (name, type, gender, age, breed, description, createdAt, UpdatedAt, UserId)
	VALUES ('Mr Whiskers', 'cat', 'm', 8, 'domestic shorthair', 'A real sweetie!', NOW(), NOW(), 1),
		     ('Sassy', 'dog', 'f', 4, 'cocker spaniel', 'Loves cuddles', NOW(), NOW(), 2),
         ('Rocket', 'cat', 'm', 2, 'tuxedo', 'Always playing', NOW(), NOW(), 3);