import Stripe from "stripe";
// Assurer une compatibilité avec la version de l'API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2023-10-16" // Optionnel, tu peux le supprimer pour laisser Stripe utiliser la version la plus récente.
});
export default stripe; //exportation de l'api de l'objet stripe
