import { Router } from "express";

const router = Router();

// serve per il refresh del token
router.get("/refresh", async (req, res) => {
    // #swagger.tags = ['auth']
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", "aptismart-keycloak");
    params.append("refresh_token", "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3ZmQ1ODhiZS1kNDI3LTRkNWItYmM3Ny1hNDU4MDdlMzdiZDkifQ.eyJleHAiOjE3NTQ2MDU3NjQsImlhdCI6MTc1NDYwMzk2NCwianRpIjoiMmMzMTMwNzQtZmYxMy00OWZkLWI1MGQtMDViODNlYjM0OThhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9hcHRpc21hcnQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2FwdGlzbWFydCIsInN1YiI6IjcwMmExMjI1LWNlNmItNDVlYS1iYjBiLWRlMmUzNjk1ZTY1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhcHRpc21hcnQta2V5Y2xvYWsiLCJzZXNzaW9uX3N0YXRlIjoiMTU0MTUzMDktNjQwNC00MzljLWIyNzYtZWZmOTI1ODdmNzU2Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjE1NDE1MzA5LTY0MDQtNDM5Yy1iMjc2LWVmZjkyNTg3Zjc1NiJ9.dX4BUtILWRKvr7p5Vo2XpKOwRBLfNTfMzxXbRTgckwc");

    const response = await fetch("http://localhost:8080/realms/aptismart/protocol/openid-connect/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
});

const KEYCLOAK_URL = 'http://localhost:8080';
const REALM = 'aptismart';
const CLIENT_ID = 'aptismart-keycloak';
const REDIRECT_URI = 'http://localhost:5173/dashboard';

//api per scambiare il code che riceve il front end dopo che si è loggato con google in access_token e refresh_token.
router.get('/get-token', async (req, res) => {
    // #swagger.tags = ['auth']
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('Manca il codice');
    }

    try {
        // Scambio code -> token
        const tokenRes = await fetch(`${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`, {
            method: "POST",
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code.toString(),
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })



        const tokenData = await tokenRes.json();
        res.json({accessToken: tokenData.access_token, refreshToken: tokenData.refresh_token});

    } catch (error:any) {
        console.error('❌ Errore nello scambio token:', error.response?.data || error.message);
        res.status(500).send('Errore durante l’autenticazione');
    }
});

export default router;