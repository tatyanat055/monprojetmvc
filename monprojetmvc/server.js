const express = require('express');
const app = express();
const path = require('path');

const PORT = 4545; 

// Définition du moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour analyser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('accueil'); // afficher accueil.ejs
});

//Route pour la page "Direct"
app.get('/direct', (req, res) => {
    res.render('direct');
});

// Route pour la page "À propos"
app.get('/apropos', (req, res) => {
    res.render('apropos'); // 
});

// Route pour afficher le formulaire d'ajout de programme TV
app.get('/formulaireProgrammeTv', (req, res) => {
    res.render('formulaireProgrammeTv');
});

// Route pour la page de contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route pour soumettre le formulaire de contact
app.post('/submit-contact', (req, res) => {
    const { nom, prenom, email, message } = req.body;
    console.log(`Nouveau message reçu : ${nom} ${prenom} - ${email} : ${message}`);
    res.send('<h1>Merci pour votre message !</h1><p>Nous vous répondrons bientôt.</p>');
});

// Route pour afficher la page "Programme TV"
app.get('/programmeTv', (req, res) => {
    res.render('programmeTv'); 
});

// Route pour soumettre un programme TV
app.post('/submit-programme', (req, res) => {
    const { heure, titre, description } = req.body;
    console.log(`Nouveau programme ajouté : ${heure} - ${titre} : ${description}`);
    res.send('<h1>Programme ajouté avec succès !</h1><p>Revenez à la page Programme TV.</p>');
});

// Route pour afficher la page de connexion
app.get('/connexion', (req, res) => {
    res.render('connexion');
});

// Route pour traiter la connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Vérification simple des identifiants (simulé)
    if (email === "tatyanat055@gmail.com" && password === "123456") {
      console.log("Connexion réussie !");
      
      // Simulation de données utilisateur à transmettre
      const userData = {
        nom: "Ali Mdahoma",
        prenom: "Tatyana",
        email: "tatyanat055@gmail.com"
      };
  
      // Rediriger vers la page Mon Espace avec les données utilisateur
      res.render('monespace', userData);
    } else {
      res.send("<h1>Échec de la connexion</h1><p>Adresse e-mail ou mot de passe incorrect.</p>");
    }
  });
  

  app.get('/deconnexion', (req, res) => {
    // Simuler une déconnexion
    console.log("Utilisateur déconnecté.");
    res.redirect('/connexion'); // Redirection vers la page de connexion
  });
  
  


// Route pour afficher la page d'inscription
app.get('/inscription', (req, res) => {
    res.render('inscription');
  });
  
  // Route pour traiter le formulaire d'inscription
  app.post('/register', (req, res) => {
    const { nom, prenom, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      res.send("<h1>Erreur</h1><p>Les mots de passe ne correspondent pas.</p>");
    } else {
      console.log(`Nouvel utilisateur : ${nom} ${prenom} - ${email}`);
      res.send('<h1>Inscription réussie !</h1><p>Bienvenue sur notre plateforme.</p>');
    }
  });
  

// Pour démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
