import express from "express";
import dotenv from "dotenv";
dotenv.config();
import homeRoutes from "./routes/router";
import checkoutRoute from "./routes/router";
import completeRoute from "./routes/router";
import cancelRoute from "./routes/router";
const app = express();
const PORT = process.env.PORT || 3000;
import path from "path";
// Configuration d'EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Définir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "../public")));
// Routes
app.use("/", homeRoutes);
app.use("/checkout", checkoutRoute);
app.use("/complete", completeRoute);
app.use("/cancel", cancelRoute);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
