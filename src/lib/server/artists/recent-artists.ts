import { artistMapCache } from ".";
import { getSpotifyToken } from "./refresh-token";

export interface SpotifyRecentArtists {
	id: string;
	name: string;
	url: string;
	image: {
		url: string;
		height: number;
		width: number;
	};
}

interface SpotifyPlayedItem {
	track: {
		artists: SpotifyTrackArtist[];
	};
}

interface SpotifyTrackArtist {
	id: string;
	name: string;
	external_urls: {
		spotify: string;
	};
}

interface SpotifyArtist {
	id: string;
	name: string;
	images: {
		url: string;
		width: number;
		height: number;
	}[];
}

const TRACK_LIMIT = 12;
const ARTIST_LIMIT = 8;

async function getRecentTracks(token: string) {
	const url = `https://api.spotify.com/v1/me/player/recently-played?limit=${TRACK_LIMIT}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) throw new Error(`Failed to fetch top tracks: ${response.statusText}`);
	const json = (await response.json()) as Promise<{ items: SpotifyPlayedItem[] }>;
	return json;
}

async function getPrimaryArtists(token: string, tracks: SpotifyPlayedItem[]): Promise<SpotifyRecentArtists[]> {
	const trackArtists = tracks.reduce((artists, track) => {
		const uniqueArtist = getUniqueTrackArtist(artists, track);
		if (uniqueArtist == null) return artists;
		artists.push(uniqueArtist);
		return artists;
	}, new Array<SpotifyTrackArtist>());

	const artistEndpoint = `https://api.spotify.com/v1/artists?ids=${trackArtists.map((artist) => artist.id).join(",")}`;
	const artistsResponse = await fetch(artistEndpoint, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!artistsResponse.ok) throw new Error(`Failed to fetch artists: ${artistsResponse.statusText}`);
	const artistsJson = (await artistsResponse.json()) as { artists: SpotifyArtist[] };
	const artists = trackArtists.map((artist) => {
		const artistData = artistsJson.artists.find((a) => a.id === artist.id);
		const image = artistData!.images[artistData!.images.length - 1]!;
		return { id: artist.id, name: artist.name, url: artist.external_urls.spotify, image };
	});

	return artists.slice(0, ARTIST_LIMIT);
}

function getUniqueTrackArtist(artists: SpotifyTrackArtist[], track: SpotifyPlayedItem) {
	for (const artist of track.track.artists) {
		if (artists.some((a) => a.id === artist.id)) continue;
		return artist;
	}

	return null;
}

export async function getRecentArtists() {
	const cachedArtists = await artistMapCache.get<SpotifyRecentArtists[]>("artists");
	if (cachedArtists) return cachedArtists;

	const spotifyToken = await getSpotifyToken();
	const spotifyTracks = await getRecentTracks(spotifyToken);
	const recentArtists = await getPrimaryArtists(spotifyToken, spotifyTracks.items);
	await artistMapCache.set("artists", recentArtists);
	return recentArtists;
}
