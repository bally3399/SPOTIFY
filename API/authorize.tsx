const SPOTIFY_CLIENT_ID: string =`d439932627124b62972dcb65dcfd5d6e`
const redirectUrl: string = "http://localhost:3000";
const BASEURL =`https://accounts.spotify.com/api/token`

function generateRandomString(length: number): string{
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    function base64encode(string: Uint8Array): string{
        return btoa(String.fromCharCode.apply(null, Array.from(string)))
            .replace(/\+/g, "_")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data)
    return base64encode(new Uint8Array(digest));

}
let codeVerifier: string = generateRandomString(128);
let urlParams = new URLSearchParams();
if(typeof window !== "undefined") {
    urlParams = new URLSearchParams(window.location.search);
}
export const authorize = () =>{
generateCodeChallenge(codeVerifier).then((codeChallenge) =>{
    let state: string = generateRandomString(16);
    let scope: string =
        "user-read-private user-read-email streaming user-read-playback";
    sessionStorage.setItem("code_verifier", codeVerifier);
    let args = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_url: redirectUrl,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
    });

    window.location.href = "https://accounts.spotify.com/authorize?" + args;
});
};

export const getToken = () =>{
    let codeVerifier = sessionStorage.getItem("code_verifier");

    let body = new URLSearchParams({
        // grant_type: "authorization_code" || "",
        // code: code || "",
        redirect_url: redirectUrl || "",
        client_id: SPOTIFY_CLIENT_ID || "",
        code_verifier: codeVerifier || "",

    });

    fetch(`${BASEURL}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    })
        .then((response) => {
            if(response.ok){
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then((data: {access_token: string}) =>{
            localStorage.setItem("access_token", data.access_token);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}