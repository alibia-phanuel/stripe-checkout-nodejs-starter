import { Request, Response } from "express";
import stripe from "../lib/stripe";
export const postCheckoutPage = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "livre sur node.js et express",
            //On pourrait rajouter une description, une image, etc., à cet endroit.
          },
          unit_amount: 50 * 100, // Prix en cents ($50.00)
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "livre sur javaScript et typesript",
            //On pourrait rajouter une description, une image, etc., à cet endroit.
          },
          unit_amount: 20 * 100, // Prix en cents ($50.00)
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    shipping_address_collection: {
      // Les pays qui sont autorisés à effectuer des paiements.
      allowed_countries: [
        "DZ", // Algérie
        "BJ", // Bénin
        "BF", // Burkina Faso
        "BI", // Burundi
        "CM", // Cameroun
        "CF", // République Centrafricaine
        "TD", // Tchad
        "KM", // Comores
        "CG", // République du Congo
        "CD", // République Démocratique du Congo
        "CI", // Côte d'Ivoire
        "DJ", // Djibouti
        "GQ", // Guinée Équatoriale
        "GA", // Gabon
        "GN", // Guinée
        "MG", // Madagascar
        "ML", // Mali
        "MR", // Mauritanie
        "MU", // Maurice
        "MA", // Maroc
        "NE", // Niger
        "RW", // Rwanda
        "SN", // Sénégal
        "SC", // Seychelles
        "TG", // Togo
        "TN", // Tunisie
      ],
    },
    success_url: `${process.env.BASE_URL}complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}cancel`,
  });
  if (session.url) {
    res.redirect(session.url);
  } else {
    // Gérer l'erreur si l'URL est null
    res.status(500).send("Erreur : L'URL de session est introuvable.");
  }
};
