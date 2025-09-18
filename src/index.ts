import express from "express";
import cors from 'cors';
import routerLogin from "./routes/login.js";
import routerAuth from "./routes/auth.js";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger-output.json' with { type: "json" };

const app = express();
const PORT: number = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/api", routerLogin);
app.use("/api/auth", routerAuth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, (error) => {
    if (!error) {
        console.log(
            "Server is Successfully Running, and App is listening on port " + PORT
        );
        console.log(
            "Swagger is listening on http://localhost:" + PORT + "/api-docs"
        );
    } else console.log("Error occurred, server can't start", error);
});