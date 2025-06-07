import { getResumeHash } from "$lib/server/resume";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { MemoryMapCache } from "@sylo-digital/kas";

const clientMapCache = new MemoryMapCache<{ requests: number }>("2m");

export const load = ({ url }) => {
	const queryCode = url.searchParams.get("code");
	return { queryCode };
};

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();
		const code = formData.get("code")?.toString();
		if (code == null) return fail(400, { failed: true });

		const clientAddress = getClientAddress();
		const clientUsage = clientMapCache.get(clientAddress);
		// limit to 2 requests per client every 2 minutes
		if (clientUsage && clientUsage.requests > 2) return fail(400, { failed: true });

		clientMapCache.set(clientAddress, { requests: (clientUsage?.requests ?? 0) + 1 });
		const hash = await getResumeHash(code);
		if (hash == null) return fail(400, { failed: true });
		return redirect(302, `/resume/${hash}`);
	},
} satisfies Actions;

export const prerender = false;
