const createTables = async () => {
  try {
    await db.execute(`
    CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
contact VARCHAR(20),
PASSWORD VARCHAR(255) NOT NULL,
profile_image VARCHAR(255)
)
    `);

    await db.execute(`
 CREATE TABLE IF NOT EXISTS notes(
note_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
note TEXT NOT NULL,
created_date DATE,
FOREIGN KEY (user_id) REFERENCES users(id)
)
    `);

    console.log(" Tables created");
  } catch (err) {
    console.error(" Error creating tables:", err.message);
  }
};

export default createTables;
