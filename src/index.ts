import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Charge les variables d'environnement définies dans un fichier .env
import errorHandler from "./middleware/errorHandler";
import homeRoutes from "./routes/router";
import checkoutRoute from "./routes/router";
import completeRoute from "./routes/router";
import cancelRoute from "./routes/router";

const app = express();
const PORT = process.env.PORT || 3000; // Définition du port du serveur (par défaut 3000 si non défini)

// Importation du module path pour gérer les chemins des fichiers statiques
import path from "path";

// Configuration du moteur de rendu EJS pour générer des vues dynamiques
app.set("view engine", "ejs");
app.set("views", "./src/views"); // Définition du dossier contenant les fichiers .ejs

// Middleware pour parser les requêtes JSON et les données des formulaires
app.use(express.json()); // Permet de traiter les requêtes avec un body en JSON
app.use(express.urlencoded({ extended: true })); // Permet de traiter les données des formulaires
// Middleware global pour gérer les erreurs
app.use(errorHandler);
// Définition du dossier public pour servir des fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));

// Définition des routes principales de l'application
app.use("/", homeRoutes); // Route pour la page d'accueil
app.use("/checkout", checkoutRoute); // Route pour la page de paiement
app.use("/complete", completeRoute); // Route affichée après un paiement réussi
app.use("/cancel", cancelRoute); // Route affichée si le paiement est annulé

// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
