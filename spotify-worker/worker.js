// todo: properly deploy to cloudflare workers through wrangler
const TOKEN_VALID = 3600 * 1000; // 1 hour

async function refreshSpotifyToken(env, key) {
	// to acquire a refresh token, follow spotify oauth2 flow
	// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
	// refresh tokens are long-lived and can be used to get new access tokens
	const storedRefreshToken = await env.storage.get("refresh_token");
	if (env.SPOTIFY_REFRESH_TOKEN == null && storedRefreshToken == null) throw new Error("No refresh token found");

	const isSubsequentRefresh = storedRefreshToken != null;
	let refreshToken = env.SPOTIFY_REFRESH_TOKEN;
	if (isSubsequentRefresh) refreshToken = await retrieveAndDecrypt("refresh_token", env, key);

	const tokenUrl = "https://accounts.spotify.com/api/token";
	const request = new Request(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
	});

	const response = await fetch(request);
	if (!response.ok) throw new Error(`Failed to refresh token: ${response.statusText}`);

	const json = await response.json();
	if (json.refresh_token) await encryptAndStore("refresh_token", json.refresh_token, env, key);
	return json.access_token;
}

async function updateSpotifyToken(key, env) {
	const storedToken = await env.storage.get("token");
	if (storedToken == null || JSON.parse(storedToken).date + TOKEN_VALID < Date.now()) {
		const token = await refreshSpotifyToken(env, key);
		await encryptAndStore("token", token, env, key);
		return token;
	}

	const decryptedToken = await retrieveAndDecrypt("token", env, key);
	return decryptedToken;
}

async function encryptAndStore(key, value, env, cryptoKey) {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const textEncoder = new TextEncoder();
	const encodedValue = textEncoder.encode(value);

	const encryptedValue = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, cryptoKey, encodedValue);
	const base64Value = btoa(String.fromCharCode(...new Uint8Array(encryptedValue)));
	env.storage.set(key, JSON.stringify({ value: base64Value, iv: Array.from(iv), date: Date.now() }));
}

async function retrieveAndDecrypt(key, env, cryptoKey) {
	const storedValue = await env.storage.get(key);
	if (storedValue == null) return null;

	const parsedValue = JSON.parse(storedValue);
	const iv = new Uint8Array(parsedValue.iv);
	const encryptedValue = new Uint8Array(
		atob(parsedValue.value)
			.split("")
			.map((c) => c.charCodeAt(0)),
	);

	const decryptedValueBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, cryptoKey, encryptedValue);
	const decryptedValue = new TextDecoder().decode(decryptedValueBuffer);
	return decryptedValue;
}

async function getRecentTracks(token) {
	const url = "https://api.spotify.com/v1/me/player/recently-played?limit=10";
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error(`Failed to fetch top tracks: ${response.statusText}`);
	const json = await response.json();
	return json;
}

// returns first artist from each track
async function getPrimaryArtists(token, tracks) {
	const artists = await Promise.all(
		tracks.map(async (track) => {
			const artist = track.track.artists[0];
			const artistData = await fetch(artist.href, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!artistData.ok) throw new Error(`Failed to fetch artist: ${artistData.statusText}`);
			const artistJson = await artistData.json();
			// last image is the smallest
			const image = artistJson.images[artistJson.images.length - 1];
			return {
				name: artist.name,
				url: artist.external_urls.spotify,
				image,
			};
		}),
	);

	return artists;
}

export default {
	async fetch(request, env, ctx) {
		const cacheUrl = new URL(request.url);
		const cacheKey = new Request(cacheUrl.toString(), request);
		const cache = caches.default;
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) return cachedResponse;

		const secretBufferArray = new TextEncoder().encode(env.SPOTIFY_CLIENT_SECRET);
		const rawKey = await crypto.subtle.digest("SHA-256", secretBufferArray);
		const encryptionKey = await crypto.subtle.importKey("raw", rawKey, "AES-GCM", false, ["encrypt", "decrypt"]);
		const spotifyToken = await updateSpotifyToken(encryptionKey, env);
		const spotifyData = await getRecentTracks(spotifyToken);
		const recentArtists = await getPrimaryArtists(spotifyToken, spotifyData.items);

		return new Response(JSON.stringify(recentArtists), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	},
};
