// Importation des modules nécessaires
import express from "express";

// Importation des fonctions contrôleurs pour gérer les requêtes associées aux différentes routes
import { getHomePage } from "../controllers/homeController";
import { postCheckoutPage } from "../controllers/checkoutControllers";
import { getCompletePage } from "../controllers/completeControllers";
import { getCancelPage } from "../controllers/cancelControllers";

// Création d'un routeur Express
const router = express.Router();

// Route pour afficher la page d'accueil
router.get("/", getHomePage);

// Route pour gérer le paiement (POST car il traite des données envoyées par le client)
router.post("/checkout", postCheckoutPage);

// Route affichant la page de confirmation après un paiement réussi
router.get("/complete", getCompletePage);

// Route affichant la page d'annulation en cas d'échec ou d'abandon du paiement
router.get("/cancel", getCancelPage);

// Exportation du routeur pour l'utiliser dans l'application principale
export default router;
