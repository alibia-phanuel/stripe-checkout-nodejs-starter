import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
};
