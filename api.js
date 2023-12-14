const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Paramètres de connexion à la base de données
const db = mysql.createConnection({
  host: 'db', // Nom du service dans docker-compose
  user: 'root', // Modifiez selon vos paramètres
  password: 'password', // Modifiez selon vos paramètres
  database: 'votreBaseDeDonnees' // Modifiez selon vos paramètres
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données');
});

// Route pour tester la connexion
app.get('/', (req, res) => {
  res.send('API fonctionnelle');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
