import express from "express";
import cors from "cors";
import userRoutes from "./routes/user/user.route";
import signInRoute from "./routes/signIn/signIn.route";
const port = 5000;

const app = express();

app.set("port", port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signInRoute);
app.use(userRoutes);

export default app;
