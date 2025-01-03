export interface StoredData<Type> {
	data: Promise<Type>;
	expire: number;
}

const expireDuration = 1000 * 60 * 5; // 5 minutes

export async function storedFetch<Type>(url: string, options?: RequestInit): Promise<StoredData<Type>> {
	const storedData = localStorage.getItem(url);
	const parsedData = storedData ? (JSON.parse(storedData) as StoredData<Type>) : null;
	if (parsedData && Date.now() > parsedData.expire) localStorage.removeItem(url);
	else if (parsedData) return parsedData;

	const fetchedData = fetch(url, options).then((response) => response.json() as Promise<Type>);
	const expireDate = Date.now() + expireDuration;
	localStorage.setItem(url, JSON.stringify({ data: await fetchedData, expire: expireDate }));

	return {
		data: fetchedData,
		expire: expireDate,
	};
}
