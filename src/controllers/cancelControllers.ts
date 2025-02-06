import { Request, Response } from "express";

export const getCancelPage = (req: Request, res: Response) => {
  res.render("cancel", {
    title: "Annulation du paiement",
    message: "Annulation du paiement",
  });
};
