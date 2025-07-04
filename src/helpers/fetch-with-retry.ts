export interface RetryFetchOptions extends RequestInit {
	retries?: number;
}

const DEFAULT_RETRIES = 3;
const TIMEOUT_MS = 5000;

export async function fetchWithRetry(
	url: string | URL | Request,
	options: RetryFetchOptions = { retries: DEFAULT_RETRIES },
) {
	if (options.retries == null) options.retries = DEFAULT_RETRIES;

	const optionsWithoutRetries = { ...options };
	const response = await fetch(url, optionsWithoutRetries);
	if (response.ok) return response;
	if (options.retries === 0) return response;

	await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));
	console.log(`[${options.retries}] Retrying fetch to ${url}`);
	return await fetchWithRetry(url, { ...options, retries: options.retries - 1 });
}
