
#creating a database 
CREATE DATABASE IF NOT EXISTS note_app;

#use that database
USE note_app;

#creating user table
CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
contact VARCHAR(20),
PASSWORD VARCHAR(255) NOT NULL,
isVerifiedEmail boolean default FALSE,
profile_image VARCHAR(255)
);

#create notes table
CREATE TABLE IF NOT EXISTS notes(
note_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
title VARCHAR(255) NOT NULL,
note TEXT NOT NULL,
created_date DATE,
update_date DATE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

#create category table
CREATE TABLE IF NOT EXISTS category
(id INT PRIMARY KEY AUTO_INCREMENT,
TYPE VARCHAR(100) NOT NULL UNIQUE);

#create note_category
CREATE TABLE IF NOT EXISTS note_category(
note_id INT,
category_id INT,
PRIMARY KEY(note_id,category_id),
FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

#nserting some categories in category table  
INSERT INTO category (TYPE) VALUES
('Work'),
('Personal'),
('Study'),
('Shopping'),
('Ideas'),
('Important');



