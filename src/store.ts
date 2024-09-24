import { writable } from "svelte/store";

// todo: replace with $page.data
// https://kit.svelte.dev/docs/load#$page-data
export const pageContext = writable<string>();
