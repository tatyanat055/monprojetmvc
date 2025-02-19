const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
// Configuration d'EJS comme moteur de rendu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true })); // Middleware pour récupérer les données POST

// Route pour ajouter un programme
app.post('/ajouter-programme', (req, res) => {
    const { titre, heure, description } = req.body;
    console.log(`Nouvelle émission : ${titre} à ${heure} - ${description}`);
    res.send("Programme ajouté avec succès !");
});

// app.use('/', authRoutes);

module.exports = app; 