// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";
// Importation de l'instance Stripe configurée
import stripe from "../lib/stripe";

/**
 * Contrôleur pour créer une session de paiement Stripe.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */
export const postCheckoutPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Création d'une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Type de paiement autorisé (cartes bancaires)
      line_items: [
        {
          price_data: {
            currency: "usd", // Devise du paiement (dollars américains)
            product_data: {
              name: "livre sur node.js et express", // Nom du produit
              // On pourrait rajouter une description, une image, etc., à cet endroit.
            },
            unit_amount: 50 * 100, // Prix en cents ($50.00), Stripe attend une valeur en cents
          },
          quantity: 1, // Quantité de ce produit
        },
        {
          price_data: {
            currency: "usd", // Devise du paiement
            product_data: {
              name: "livre sur JavaScript et TypeScript", // Nom du produit
              // Description, image, etc. peuvent être ajoutées ici
            },
            unit_amount: 20 * 100, // Prix en cents ($20.00)
          },
          quantity: 2, // Quantité de ce produit
        },
      ],
      mode: "payment", // Mode de paiement (paiement unique)
      shipping_address_collection: {
        // Les pays autorisés à effectuer des paiements
        allowed_countries: [
          "DZ",
          "BJ",
          "BF",
          "BI",
          "CM",
          "CF",
          "TD",
          "KM",
          "CG",
          "CD",
          "CI",
          "DJ",
          "GQ",
          "GA",
          "GN",
          "MG",
          "ML",
          "MR",
          "MU",
          "MA",
          "NE",
          "RW",
          "SN",
          "SC",
          "TG",
          "TN", // Liste des pays
        ],
      },
      // URL de redirection en cas de succès de la transaction
      success_url: `${process.env.BASE_URL}complete?session_id={CHECKOUT_SESSION_ID}`,
      // URL de redirection en cas d'annulation de la transaction
      cancel_url: `${process.env.BASE_URL}cancel`,
    });

    // Si la session a bien été créée, redirige l'utilisateur vers Stripe pour finaliser le paiement
    if (session.url) {
      res.redirect(session.url);
    } else {
      // Si l'URL de la session est introuvable, retourne une erreur
      res.status(500).send("Erreur : L'URL de session est introuvable.");
    }
  } catch (error) {
    // Envoi de l'erreur au middleware de gestion des erreurs
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
