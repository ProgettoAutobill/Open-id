import express from "express";
import cors from 'cors';
import routerLogin from "./routes/login.js";
import routerAuth from "./routes/auth.js";

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/api", routerLogin);
app.use("/api/auth", routerAuth);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(
            "Server is Successfully Running, and App is listening on port " + PORT
        );
    } else console.log("Error occurred, server can't start", error);
});