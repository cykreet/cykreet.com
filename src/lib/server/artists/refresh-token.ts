import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";
import { artistMapCache } from ".";

const TOKEN_VALID = 3600 * 1000; // 1 hour

async function getAccessToken() {
	// to acquire a refresh token, follow spotify oauth2 flow
	// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
	// refresh tokens are long-lived and can be used to get new access tokens
	// todo: skip errors and simply return an empty artist array
	if (SPOTIFY_REFRESH_TOKEN == null || SPOTIFY_CLIENT_ID == null || SPOTIFY_CLIENT_SECRET == null)
		throw new Error("Spotify environment variables not set");

	const tokenUrl = "https://accounts.spotify.com/api/token";
	const request = new Request(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: SPOTIFY_REFRESH_TOKEN,
		}),
	});

	const response = await fetch(request);
	if (!response.ok) throw new Error(`Failed to refresh token: ${response.statusText}`);
	const json = await response.json();
	return json.access_token;
}

export async function getSpotifyToken() {
	const accessToken = await artistMapCache.get("token");
	if (accessToken == null) {
		const refreshedToken = await getAccessToken();
		await artistMapCache.set("token", refreshedToken, TOKEN_VALID);
		return refreshedToken;
	}

	return accessToken;
}
