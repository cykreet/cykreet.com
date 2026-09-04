---
name: cykreet.com
description: My personal website for housing projects and thoughts, currently hosted on Vercel.
technologies: ["SvelteKit"]
publishedDate: "2022-07-19"
github: "cykreet/alligator"
---

My intentions for a personal site have never been super clear to me, other than having some sort of fingerprint I can point to. Mostly, this site has been a playground for me to experiment with some web stuff, like svelte, and a place to host projects.

All projects on this site are parsed from markdown files with mdsvex, and rendered with SSR wherever possible. The recent commit list is pulled from GitHub's GraphQL API, which we then cache for a few hours in a Redis instance hosted on Vercel. This Redis instance also powers the contact form timeout.