---
name: oxide
description: Excel daily report data aggregator, exported to csv from an egui application.
technologies: ["Rust"]
publishedDate: "2022-07-19"
github: "cykreet/oxide"
---

This is/was a small personal project for someone I know personally. Perhaps not the most presentable or exciting in terms of actual functionality scope, but it ended being really useful for them and synergised with their workflows well enough for them to continue using it months later (my favourite kinds of projects).

I had some fun though, this one builds an egui application into a single executable. I wanted to minimise setup requirements and have a minimal application footprint, so any configuration is written to the executable (input path, output path, etc.). On Windows this means writing a temporary executable, but these are cleaned up whenever possible.
