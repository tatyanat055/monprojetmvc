const express = require('express');
const app = express();
const path = require('path');

const PORT = 4545; // Ou un autre port si nécessaire

// Définir le moteur de rendu sur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('accueil');
});

// Route pour la page "Direct"
app.get('/direct', (req, res) => {
    res.send('<h1>Page du Direct<h1>');
});

// Route pour afficher la page "À propos"
app.get('/apropos', (req, res) => {
    res.render('apropos'); // Vérifie que views/apropos.ejs existe
});

// Route pour la page de contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route pour soumettre le formulaire (test sans base de données)
app.post('/submit-contact', (req, res) => {
    const { nom, prenom, email, message } = req.body;
    console.log(`Nouveau message reçu : ${nom} ${prenom} - ${email} : ${message}`);
    res.send('<h1>Merci pour votre message !</h1><p>Nous vous répondrons bientôt.</p>');
});

// Route pour afficher la page "Programme TV"
app.get('/programmeTv', (req, res) => {
    res.render('programmeTv'); // Vérifie que views/programmeTv.ejs existe
});

// Route pour afficher le formulaire d'ajout de programme TV
app.get('/formulaireProgrammeTv', (req, res) => {
    res.render('formulaireProgrammeTv'); 
});

app.post('/submit-programme', (req, res) => {
    const { heure, titre, description } = req.body;
    console.log(`Nouveau programme ajouté : ${heure} - ${titre} : ${description}`);
    res.send('<h1>Programme ajouté avec succès !</h1><p>Revenez à la page Programme TV.</p>');
});

// 🚀 Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
