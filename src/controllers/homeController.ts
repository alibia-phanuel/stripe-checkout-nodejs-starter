import { Request, Response } from "express";

export const getHomePage = (req: Request, res: Response) => {
  res.render("home", {
    title: "Panier d'achats",
    message: "Panier d'achats !",
  });
};
