---
name: journey
hero: header.png
description: Modern desktop client for Moodle course content, prioritises quick access to material and local control.
technologies: ["React", "Rust", "Vite", "TypeScript", "Tailwind", "Tauri"]
publishedDate: "2025-08-13"
github: "cykreet/journey"
---

[Moodle](https://moodle.org) is not the most modern or user-friendly platform for navigating course content, but it's used by a lot institutions, and is probably modular enough to attract the attention it's gotten. The official Moodle desktop client was discontinued in 2021, which they claim was in an effort to priortise development of the mobile app [[source]](https://docs.moodle.org/502/en/Moodle_Desktop) and actually recommend using a web browser to access Moodle in desktop environments.

As a student myself, the web browsing experience has been very disappointing. There is no client routing, so It's obvious you're navigating to a new page every time you click a link, and the page load times can be long, if not inconsistent which can vary from configuration to configuration. I have a few other nitpicky reasons for disliking the web experience, but I wanted a solution that could work for desktop and, preferably without an internet connection, so I decided to make my own client for Moodle course content. Important to note: my intention for this project is and was never to replace the Moodle web client altogether (I have no interest in supporting assessments or quizzes), but to provide a better experience for browsing course content.

### tauri

[Tauri](https://v2.tauri.app) seemed like the right choice at the time, and I'm still happy that I went with it. It's a fun combination of performance and development flexibility, given that you get the best parts of Rust with the added benefit of a modern web-based UI through Tauri's webview. Having access to Rust for the bulk of the backend work (sqlite database, file system access, authentication, content parsing, etc.) and React for the frontend has allowed me to speed up development as opposed to going all in on a native solution, that probably would've involved a lot of boilerplate and a lot of time spent on UI work.

It is currently functional and should work for most Moodle sites (I've tested 2, so far), and provides a decent experience for viewing course content that includes "books" or HTML-formatted content (which can also include LaTeX), and other content types like PDFs, images, and videos (media files are downloaded and cached locally for offline access).

![Journey Preview](/assets/projects/journey/preview.png)

Development has slowed down a little recently as the course material I have had to review as part of my studies have significantly decreased, but I still use the application to access Moodle content, and I have a few ideas for improvements that I may implement in the future.