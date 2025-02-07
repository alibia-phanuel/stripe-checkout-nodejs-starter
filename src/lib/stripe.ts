// Importation du module Stripe pour gérer les paiements
import Stripe from "stripe";

// Création d'une instance de Stripe avec la clé secrète récupérée depuis les variables d'environnement
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2023-10-16" // Optionnel : en l'absence de cette option, Stripe utilisera la version la plus récente de son API
});

// Exportation de l'instance Stripe pour être utilisée dans d'autres fichiers (ex: contrôleurs)
export default stripe;
