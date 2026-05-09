export async function generateAccessToken() {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(
        `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        }
    );

    const data = await response.json();
// console.log("Access Token Response:", data);
    return data.access_token;
}