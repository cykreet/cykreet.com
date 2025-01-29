import {
	IconBrandSvelte,
	IconBrandTypescript,
	IconBrandRust,
	IconBrandDocker,
	IconBrandUbuntu,
	IconBrandGit,
	IconBrandTailwind,
	IconCoffee,
	IconBrandCSharp,
	IconBrandReact,
	IconBrandVite,
	IconBrandNextjs,
	IconBrandGithub,
	IconDumpling,
} from "@tabler/icons-svelte";

export interface TechnologyMeta {
	description: string;
	website: string;
	colour: string;
	icon: ConstructorOfATypedSvelteComponent;
}

export enum Technology {
	Bun = "Bun",
	SvelteKit = "SvelteKit",
	TypeScript = "TypeScript",
	Rust = "Rust",
	Docker = "Docker",
	Linux = "Linux",
	Git = "Git",
	Tailwind = "Tailwind",
	Java = "Java",
	CSharp = "C-Sharp",
	React = "React",
	Vite = "Vite",
	Nextjs = "Next.js",
	GitHub = "GitHub",
}

type SkillsCollection = Record<Technology, TechnologyMeta>;

export const Skills = {
	[Technology.Bun]: {
		description: "JavaScript runtime which includes a bundler, test runner, and node.js compatibility.",
		website: "https://bun.sh/",
		colour: "#f6cfbd",
		icon: IconDumpling,
	},
	[Technology.CSharp]: {
		description: "Programming language mostly associated with the .NET platform",
		website: "https://docs.microsoft.com/en-us/dotnet/csharp/",
		colour: "#9d4f96",
		icon: IconBrandCSharp,
	},
	[Technology.Docker]: {
		description: "A containerisation platform",
		website: "https://www.docker.com/",
		colour: "#1072d8",
		icon: IconBrandDocker,
	},
	[Technology.Git]: {
		description: "A version control system",
		website: "https://git-scm.com/",
		colour: "#f05539",
		icon: IconBrandGit,
	},
	[Technology.GitHub]: {
		description: "A code hosting platform",
		website: "https://github.com",
		colour: "#a793de",
		icon: IconBrandGithub,
	},
	[Technology.Java]: {
		description: "A general-purpose programming language",
		website: "https://www.java.com/",
		colour: "#ed272c",
		icon: IconCoffee,
	},
	[Technology.Linux]: {
		description: "An open-source operating system",
		website: "https://www.linux.org/",
		colour: "#ea5515",
		icon: IconBrandUbuntu,
	},
	[Technology.Nextjs]: {
		description: "A React framework",
		website: "https://nextjs.org/",
		colour: "white",
		icon: IconBrandNextjs,
	},
	[Technology.React]: {
		description: "A JavaScript library",
		website: "https://reactjs.org/",
		colour: "#61dafb",
		icon: IconBrandReact,
	},
	[Technology.Rust]: {
		description: "Performant memory-safe programming language, suitable for embedded systems and web servers.",
		website: "https://www.rust-lang.org/",
		colour: "#f75208",
		icon: IconBrandRust,
	},
	[Technology.SvelteKit]: {
		description:
			"Utilises Svelte interface components to build web applications, which allows for routing, server-side rendering, and more.",
		website: "https://svelte.dev/",
		colour: "#ff4408",
		icon: IconBrandSvelte,
	},
	[Technology.Tailwind]: {
		description: "A utility-first CSS framework",
		website: "https://tailwindcss.com/",
		colour: "#1dc0cd",
		icon: IconBrandTailwind,
	},
	[Technology.TypeScript]: {
		description: "Strongly typed superset of JavaScript, which compiles to plain JavaScript.",
		website: "https://www.typescriptlang.org/",
		colour: "#377cc8",
		icon: IconBrandTypescript,
	},
	[Technology.Vite]: {
		description: "A build tool",
		website: "https://vitejs.dev/",
		colour: "#ffcd25",
		icon: IconBrandVite,
	},
} satisfies SkillsCollection;
