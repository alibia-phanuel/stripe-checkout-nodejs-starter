import { Request, Response } from "express";
import stripe from "../lib/stripe";
export const getCompletePage = async (req: Request, res: Response) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id as string, {
      expand: ["payment_intent.payment_method"],
    }),
    stripe.checkout.sessions.listLineItems(req.query.session_id as string),
  ]);
  // console.log(JSON.stringify(await result));
  res.render("complete", {
    title: "Le paiement a été effectué",
    message: "Le paiement a été effectué avec succès",
  });
};
