// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";
// Importation de l'instance Stripe configurée
import stripe from "../lib/stripe";

/**
 * Contrôleur pour afficher la page de confirmation après un paiement réussi.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */
export const getCompletePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Récupération des détails de la session Stripe et des articles achetés
    const result = Promise.all([
      stripe.checkout.sessions.retrieve(req.query.session_id as string, {
        expand: ["payment_intent.payment_method"], // Récupération des détails du paiement
      }),
      stripe.checkout.sessions.listLineItems(req.query.session_id as string), // Liste des articles achetés
    ]);

    await result;
    // console.log(JSON.stringify(await result));
    // Rendu de la vue "complete.ejs" avec les informations de confirmation
    res.render("complete", {
      title: "Le paiement a été effectué", // Titre de la page
      message: "Le paiement a été effectué avec succès", // Message affiché à l'utilisateur
    });
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
