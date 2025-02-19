module.exports = {
    connexionView : (req, res) => {
        res.render('connexion');
    },

    //Récuperation de l'adresse mail et le mot de passe de l'utilisateur 
    authConnexion : (req, res) => {
        const email = req.body.email;
        const password = req.body.password; 
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
    
            // Vérifier l'authenticité du mot de passe par rapport au mot de passe stocké dans la base de données
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).send('Email ou mot de passe incorrect.');
            }
    
            // Créer la session utilisateur
            req.session.userId = user.id;
            req.session.userName = user.nom;

            const userData = {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
              };
    
            res.send('Connexion réussie !');
            // Rediriger vers la page Mon Espace avec les données utilisateur
            res.render('monespace', userData);
        });
    }

};


