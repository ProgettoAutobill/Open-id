import { Router } from "express";

const router = Router();


router.post("/login", async (req, res) => {
// #swagger.tags = ['auth']

    try {
        const { username, password } = req.body;

        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("client_id", "aptismart-keycloak");
        params.append("username", username);
        params.append("password", password);

        const result: any = await fetch(
            "http://localhost:8080/realms/aptismart/protocol/openid-connect/token",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params,
            }
        );

        const response = await result.json();

        console.log(response);

        if(result.status != 200){
            return res.status(result.status).json({
                success: false,
                error: response.error,
                description: response.error_description
            })
        } else {
            return res.status(200).json({success: true, payload: response});
        }

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
            description: error
        });
    }
});

export default router;