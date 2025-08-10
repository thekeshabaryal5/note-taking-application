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
    password VARCHAR(255) NOT NULL,
    isVerifiedEmail BOOLEAN DEFAULT FALSE,
    profile_image VARCHAR(255)
);

#create notes table
CREATE TABLE IF NOT EXISTS notes(
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    note TEXT NOT NULL,
    created_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_0900_ai_ci;

#create category table
CREATE TABLE IF NOT EXISTS category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL UNIQUE
);

#create note_category table
CREATE TABLE IF NOT EXISTS note_category(
    note_id INT,
    category_id INT,
    PRIMARY KEY(note_id, category_id),
    FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
