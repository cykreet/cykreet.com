import { artistMapCache } from ".";

const TOKEN_VALID = 3600 * 1000; // 1 hour

async function getAccessToken() {
	// to acquire a refresh token, follow spotify oauth2 flow
	// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
	// refresh tokens are long-lived and can be used to get new access tokens
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
	const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
	const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	if (refreshToken == null || spotifyClientId == null || spotifyClientSecret == null)
		throw new Error("No refresh token found");

	const tokenUrl = "https://accounts.spotify.com/api/token";
	const request = new Request(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${btoa(`${spotifyClientId}:${spotifyClientSecret}`)}`,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
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
