--[1]--Installation des dépendences--

/*Sur Bash :
" npm install mysql2 dotenv bcrypt express-session "
installation de plusieurs modules :
mysql2 → pour interagir avec MySQL
dotenv → pour gérer les variables d'environnement
bcrypt → pour hacher les mots de passe
express-session → pour gérer les sessions utilisateur 

[2]--Configuration des variables d’environnement (.env)---
On a créé un fichier .env où on a stocké les paramètres de connexion à la base de données :

[ fichier .env ]
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= Tatatamk8
DB_NAME=monprojetmvc
PORT=4545
SESSION_SECRET=un_secret_pour_les_sessions

A quoi sert .env ?

Éviter de stocker des informations sensibles directement dans le code.
Rendre l'application facile à déplacer sur un autre serveur sans changer le code.

[3]Connexion à MySQL
On a défini la connexion à la base de données avec db.js (voir le code)
=> On utilise dotenv.config() pour charger les variables d’environnement.
=> On crée une connexion avec mysql.createConnection() en utilisant les informations du .env.
=> Si la connexion réussit, un message Connexion réussie à MySQL ✅ s'affiche.
=> Sinon, une erreur est affichée dans la console.
=> Enfin, on exporte connection pour l'utiliser dans d'autres fichiers (ex : pour exécuter des requêtes SQL).

[4]  Création de la table users dans MySQL
Dans MySQL, on a créé une table users avec cette requête SQL : */

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*=> id INT AUTO_INCREMENT PRIMARY KEY → chaque utilisateur a un ID unique qui s’incrémente automatiquement.
=> nom VARCHAR(100) NOT NULL → champ pour stocker le nom de l'utilisateur.
=> email VARCHAR(100) UNIQUE NOT NULL → champ pour stocker l’email, qui doit être unique.
=> password VARCHAR(255) NOT NULL → champ pour stocker le mot de passe haché (crypté).
=> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP → enregistre automatiquement la date et l’heure d'inscription.

[5] Gestion de l'inscription 
On a créé un fichier routes/auth.js pour gérer l'inscription d'un utilisateur avec la route /register : (voir le code)
=> On récupère les données envoyées par l’utilisateur (nom, email, password).
=> On vérifie si l’email existe déjà dans la base de données avec ce code :
 -- db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => { --
=> On hache le mot de passe avec bcrypt :
-- const hashedPassword = await bcrypt.hash(password, 10); --
=> On utilise bcrypt.hash(password, 10) pour sécuriser le mot de passe.
=> On insere les données dans MySQL 
-- db.query('INSERT INTO users (nom, email, password) VALUES (?, ?, ?)', 
    [nom, email, hashedPassword], -- 
=> On enregistre les mots de passe.
=> Si l'insertion réussit, on affiche "Inscription réussie !"

[6] Ajouter une route à notre server.js
--const authRoutes = require('./routes/auth');
app.use(authRoutes); --
=> Notre fichier server.js sait que les routes d'authentification se trouvent dans routes/auth.js.
=> Quand un utilisateur fait un POST sur /register, il sera redirigé vers notre logique d'inscription.


On a maintenant une inscription 100% fonctionnelle avec Node.js + MySQL ! 

On va maintenant passé à la connexion des utilisateurs

[1]Ajouter la route de connexion sur routes/auth.js (voir le code)

=> On récupère l’email et le password envoyés par l’utilisateur.
=> On vérifie si l'utilisateur existe dans la base de données :
=> Si aucun utilisateur avec cet email n'est trouvé → Email ou mot de passe incorrect.
=> On compare le mot de passe entré avec celui stocké en base de données (qui est haché) :
=> Si le mot de passe ne correspond pas → Email ou mot de passe incorrect.
=> Si tout est correct, on enregistre l’utilisateur dans la session :
=> req.session.userId = user.id; → On sauvegarde l'ID dans la session.
=> req.session.userName = user.nom; → On sauvegarde aussi le nom.
=> On renvoie "Connexion réussie !".

[2]Configuration des sessions dans server.js (voir le code ligne 117 - 124)
=> secret : process.env.SESSION_SECRET
Clé secrète pour sécuriser les sessions.
=> resave : false  => empêche la sauvegarde inutiles des sessions.
=> saveUnitialized: false => Ne crée pas de session tant que l'utilisateur ne se connecte pas.
=> cookie: { secure: false } = Doit être true si le site utilise HTTPS.

[3] Ajouter la route de déconnexion (voir le code ligne 65 - 72)
=> req.session.destroy() supprime la session de l'utilisateur.
=> Si tout se passe bien, on affiche "Déconnexion réussie."

[4] Ajout du const authRoutes dans server.js

[5] Tester la connexion avec Postman
    - Faire une requête POST sur http://localhost:4545/login.
    - Dans BODY => raw => JSON :
    {
        "email": "tatyana@example.com"
        "password" : "123456"
    }
    - SEND 
    - Si les identifiants sont bons, "Connexion réussie ! "
[6] Vérification si l'utilisateur est connecter à /monespace (voir auth.js ligne 72 - 77)
=> Si req.sessionUserId n'existe pas, l'utilisateur n'est pas connecté => "Accés refusé."
=> Sinon, on affiche "Bienvenue [nom] dans votre espace personnel.".*/
