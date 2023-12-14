-- Création de la base de données (si elle n'existe pas)
CREATE DATABASE IF NOT EXISTS cours;

-- Utilisation de la base de données créée
USE cours;

-- Création de la table `personne`
CREATE TABLE IF NOT EXISTS personne (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    retard TIME DEFAULT '00:00:00' NOT NULL,
    date DATE NOT NULL,
    INDEX (nom, prenom),
    INDEX (date)
);

-- Insertion d'une entrée de test (optionnel)
INSERT INTO personne (nom, prenom, retard, date) VALUES ('Doe', 'John', '00:15:00', CURDATE());
