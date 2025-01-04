export interface StoredData<Type> {
	data: Type;
	expire: number;
}

const expireDuration = 1000 * 60 * 60 * 6; // 6 hours

export async function storedFetch<Type>(url: string, options?: RequestInit): Promise<Type | null> {
	const storedData = localStorage.getItem(url);
	const parsedData = storedData ? (JSON.parse(storedData) as StoredData<Type>) : null;
	if (parsedData && Date.now() > parsedData.expire) localStorage.removeItem(url);
	else if (parsedData) return parsedData.data;

	const dataResponse = await fetch(url, options);
	if (!dataResponse.ok) {
		console.error(`Failed to fetch data from ${url}: ${dataResponse.status} ${dataResponse.statusText}`);
		return null;
	}

	const jsonData = await dataResponse.json();
	const expireDate = Date.now() + expireDuration;
	localStorage.setItem(url, JSON.stringify({ data: jsonData, expire: expireDate }));
	return jsonData;
}
