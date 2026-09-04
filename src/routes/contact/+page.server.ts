import { type Actions, fail } from "@sveltejs/kit";
import { RedisSetCache } from "@sylo-digital/kas";
import { validate } from "deep-email-validator";
import { fetchWithRetry } from "../../helpers/fetch-with-retry.js";
import { redisConnection } from "../../helpers/get-redis-connection.js";
import { MAILGUN_DOMAIN, MAILGUN_KEY, MAILGUN_TO } from "$env/static/private";
import { _CLIENT_TTL_MS } from "./+page.js";

const MAILGUN_HOST = "https://api.mailgun.net";
const CACHE_KEY = "mail-clients";

const clientSetCache = new RedisSetCache<string>(redisConnection, CACHE_KEY);

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();
		const name = formData.get("name")?.toString();
		const fromEmail = formData.get("email")?.toString();
		const message = formData.get("message")?.toString();
		if (name == null || fromEmail == null || message == null) return fail(400, { message: "Form data missing" });
		if (name.length > 100 || fromEmail.length > 100 || message.length > 500)
			return fail(400, { message: "Form data exceeds length requirements" });

		const validateAddress = await validate({
			email: fromEmail,
			// additionalTopLevelDomains: tlds,
			validateTypo: false, // todo: deep-email-validator in general is kinda dead, need to replace soon
			validateSMTP: false, // hardcoded 10s socket timeout on smtp checks not enough for vercel
		});
		if (validateAddress.valid === false) {
			const failLevel = validateAddress.reason;
			const failReason = Object.entries(validateAddress.validators).find(([key]) => key === failLevel)?.[1].reason;
			console.log(
				`Failed to validate email ${fromEmail}: ${validateAddress.reason}`,
				failReason && `\n(${failReason})`,
			);

			return fail(400, { message: "The provided email is invalid" });
		}

		// https://vercel.com/docs/edge-network/headers/request-headers#x-forwarded-for
		const requestIp = request.headers.get("x-forwarded-for") ?? getClientAddress();
		// atomic checking and adding of entries
		const added = await redisConnection.sadd(CACHE_KEY, requestIp);
		if (added === 0) {
			return fail(429, { message: "Please wait before sending another message" });
		}

		// set expire if entry doesn't already exist
		await redisConnection.pexpire(CACHE_KEY, _CLIENT_TTL_MS, "NX");

		const encodedAuth = btoa(`api:${MAILGUN_KEY}`);
		const mailgunUrl = new URL(`${MAILGUN_HOST}/v3/${MAILGUN_DOMAIN}/messages`);
		mailgunUrl.searchParams.set("from", `${name} <${fromEmail}>`);
		mailgunUrl.searchParams.set("to", MAILGUN_TO);
		mailgunUrl.searchParams.set("subject", `Contact form submission from ${name}`);
		mailgunUrl.searchParams.set("text", message);
		const response = await fetchWithRetry(mailgunUrl, {
			method: "POST",
			headers: {
				Authorization: `Basic ${encodedAuth}`,
			},
		});

		if (!response.ok) {
			console.error(`Failed to send email: ${response.status} ${response.statusText}`);
			return fail(500, { message: "Failed to send email, please try again" });
		}

		return { success: true };
	},
} satisfies Actions;

export const prerender = false;
