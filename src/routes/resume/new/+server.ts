import { ADMIN_TOKEN } from "$env/static/private";
import { requestResumeCode } from "$lib/server/resume/index.js";

// admin endpoint to request a new resume access code
export const POST = async ({ request, url }) => {
	if (request.headers.get("Authorization") !== `Bearer ${ADMIN_TOKEN}`) {
		return new Response(null, { status: 401 });
	}

	const resumeCode = await requestResumeCode();
	const body = {
		code: resumeCode.code,
		hash: resumeCode.hash,
		link: `${url.origin}/resume?code=${resumeCode.code}`,
	};

	return new Response(JSON.stringify(body), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
