// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";

/**
 * Contrôleur pour afficher la page d'annulation du paiement.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */
export const getCancelPage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Affichage de la vue d'annulation du paiement
    res.render("cancel", {
      title: "Annulation du paiement", // Titre de la page
      message: "Annulation du paiement", // Message affiché sur la page
    });
  } catch (error) {
    // Envoi de l'erreur au middleware de gestion des erreurs
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
