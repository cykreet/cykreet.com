---
name: alligator
description: Discord webhook proxy server, which batches sequential requests to minimise ratelimits. Built to be a drop-in replacement for webhook endpoints.
technologies: ["Rust", "Docker", "GitHub"]
publishedDate: "2022-07-19"
website: "https://hub.docker.com/r/cykreet/alligator"
github: "cykreet/alligator"
---

alligator was my first venture into Rust, and largely lower-level programming in general. It was made in an effort to minimise ratelimits associated with Discord webhook endpoints at scale, alligator attempts to merge sequential requests made within a configurable time frame and make a single request to Discord. It is now over 4 years old with no changes since, and continues to be used in production.

Like a lot of my projects, I usually try to prioritise ease of delivery to anyone who might want to use it, so alligator is automatically published with each new version to [Docker's public registry](https://hub.docker.com/r/cykreet/alligator). Any push to a versioned tag on GitHub will trigger a GitHub Action.