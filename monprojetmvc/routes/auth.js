const express = require ('express');
const bcrypt = require('bcrypt'); 
const db = require('../db'); //Importation de la connexion MySQL
const app = require('../app');

const router = express.Router();

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

// Route de connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur.');
        }

        if (results.length === 0) {
            return res.status(401).send('Email ou mot de passe incorrect.');
        }

        const user = results[0];

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Email ou mot de passe incorrect.');
        }

        // Créer la session utilisateur
        req.session.userId = user.id;
        req.session.userName = user.nom;

        res.send('Connexion réussie !');
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