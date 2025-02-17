const mongoose = require ('mongoose');
require ('dotenv').config();

async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            userNewURLParser: true,
            userUnifiedTopology: true,
        });
        console.log("Connexion à MongoDB réussie !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        process.exit(1); //Quitte l'application en cas d'échec
    }
}
module.exports = connectDB;