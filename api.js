const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Paramètres de connexion à la base de données
const db = mysql.createConnection({
  host: 'db', // Nom du service dans docker-compose
  user: 'root', // Modifiez selon vos paramètres
  password: 'password', // Modifiez selon vos paramètres
  database: 'cours' // Modifiez selon vos paramètres
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données');
});

// Middleware pour parser le JSON
app.use(express.json());

// Route pour tester la connexion
app.get('/', (req, res) => {
  res.send('API fonctionnelle');
});

// Route pour obtenir toutes les personnes
app.get('/personnes', (req, res) => {
  db.query('SELECT * FROM personne', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
    res.json(results);
  });
});

// Route pour ajouter une personne
app.post('/personnes', (req, res) => {
  const { nom, prenom, classe } = req.body; // 'class' est un mot-clé réservé en JS, utilisons 'classe'
  db.query('INSERT INTO personne (nom, prenom, classe) VALUES (?, ?, ?)', 
    [nom, prenom, classe], 
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de la personne' });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, classe });
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
