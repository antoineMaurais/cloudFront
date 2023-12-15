import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

// Parameters for connecting to the database
const db = mysql.createConnection({
  host: '192.168.100.102', // Name of the service in docker-compose
  user: 'root', // Modify according to your parameters
  password: 'password', // Modify according to your parameters
  database: 'cours' // Modify according to your parameters
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON
app.use(express.json());

// Route to test the connection
app.get('/', (req, res) => {
  res.send('API is functional');
});

// Route to get all people
app.get('/personnes', (req, res) => {
  db.query('SELECT * FROM personne', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    res.json(results);
  });
});

// Route to add a person
app.post('/personnes', (req, res) => {
  const { nom, prenom, classe } = req.body; // 'class' is a reserved keyword in JS, so we use 'classe'
  db.query('INSERT INTO personne (nom, prenom, classe) VALUES (?, ?, ?)', 
    [nom, prenom, classe], 
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding the person' });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, classe });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
