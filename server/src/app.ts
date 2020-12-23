import cors from "cors";
import express from "express";
import userRoutes from "./routes/user/user.route";
import signInRoute from "./routes/authentication/authentication.route";

const port = 5000;
const app = express();

app.set("port", port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signInRoute);
app.use(userRoutes);

export default app;
