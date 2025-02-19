const express = require ('express');
const bcrypt = require('bcrypt'); 
const db = require('../db'); //Importation de la connexion MySQL
const app = require('../app');
const authController = require('../controllers/authController');

const router = express.Router();

//Route de connexion (pour afficher le formulaire de connexion)
router.get('/connexion', authController.connexionView);
router.post('/login',authController.authConnexion);

//Route d'inscription
router.post('/register', async (req, res) => {
    const { nom, email, password } = req.body;
        //Vérifier si l'email existe déjà 
    db.query ('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (results.length > 0) {
            return res.send ('Cet email est déjà utilisé.');
        }
     //Hacher le mot de passe
     const hashedPassword = await bcrypt.hash(password, 10);
     
     //Inserer l'utilisateur dans la base données
     db.query ('INSERT INTO users (nom, email, password) VALUES (?, ?, ?)',
        [nom, email, hashedPassword],
            (err, result) => {
                if (err) {
                 console.error(err);
                return res.send('Erreur lors de l\inscription.');
                 }
                res.send('Inscription réussi !');
             }
         );
    }); 
});

//Route pour afficher le nom d'utilisateur connecté 
router.get('/monespace', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Accès refusé. Veuillez vous connecter.');
    }
    res.send(`Bienvenue ${req.session.userName} dans votre espace personnel.`);
});

// Route Mon Espace 
router.get('/monespace', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Accès refusé. Veuillez vous connecter.');
    }
    res.send(`Bienvenue ${req.session.userName} dans votre espace personnel.`);
});



// Route de déconnexion
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erreur lors de la déconnexion.');
        }
        res.send('Déconnexion réussie.');
    });
});


module.exports = router;