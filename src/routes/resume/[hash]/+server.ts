import { RESUME_URL } from "$env/static/private";
import { hasResumeHash } from "$lib/server/resume/index.js";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ params, setHeaders }) => {
	const hash = params.hash;
	setHeaders({ "Cache-Control": "private, max-age=172800, must-revalidate" });
	if ((await hasResumeHash(hash)) === false) return redirect(302, "/resume");
	// just storing this file in vercel's fast blob storage is sufficient, then we just proxy
	// the blob data if the requested hash is valid
	const resumeBlob = await fetch(RESUME_URL).then((response) => response.blob());

	return new Response(resumeBlob, {
		headers: {
			"Content-Type": "application/pdf",
		},
	});
};
