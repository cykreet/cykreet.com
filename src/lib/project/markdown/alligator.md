---
name: Alligator
description: Discord webhook proxy server, which batches sequential requests to minimise ratelimits. Built to be a drop-in replacement for webhook endpoints.
technologies: ["Rust", "Docker"]
publishedDate: "2022-07-19"
github: "cykreet/alligator"
---

Alligator was my first venture into Rust, and largely lower-level programming in general. It was made in an effort to minimise ratelimits associated with Discord webhook endpoints at scale, alligator attempts to merge sequential requests made within a configurable time frame and make a single request to Discord.

