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
		description: "JavaScript runtime which includes a bundler, test runner, and Node.js compatibility.",
		website: "https://bun.sh",
		colour: "#f6cfbd",
		icon: IconDumpling,
	},
	[Technology.CSharp]: {
		description: "Programming language developed by Microsoft, mostly associated with the .NET platform.",
		website: "https://docs.microsoft.com/en-us/dotnet/csharp",
		colour: "#9d4f96",
		icon: IconBrandCSharp,
	},
	[Technology.Docker]: {
		description: "Set of virtualisation tools designed to deliver containerised applications.",
		website: "https://docker.com",
		colour: "#1072d8",
		icon: IconBrandDocker,
	},
	[Technology.Git]: {
		description:
			"Free and open source version control system, widely adopted by developer platforms such as GitHub and GitLab.",
		website: "https://git-scm.com",
		colour: "#f05539",
		icon: IconBrandGit,
	},
	[Technology.GitHub]: {
		description:
			"Collaborative developer platform, which also provides additional features such as bug tracking and continious integration.",
		website: "https://github.com",
		colour: "#a793de",
		icon: IconBrandGithub,
	},
	[Technology.Java]: {
		description:
			"General purpose programming language and development platform, compiled applications run on Java virtual machines.",
		website: "https://java.com",
		colour: "#ed272c",
		icon: IconCoffee,
	},
	[Technology.Linux]: {
		description:
			"An open-source operating system. The Windows System for Linux (WSL) allows for interoperability between Linux applications and Windows.",
		website: "https://linux.org",
		colour: "#ea5515",
		icon: IconBrandUbuntu,
	},
	[Technology.Nextjs]: {
		description: "A React framework which provides additional features to streamline full-stack web development.",
		website: "https://nextjs.org",
		colour: "white",
		icon: IconBrandNextjs,
	},
	[Technology.React]: {
		description: "JavaScript component-based user interface library for web and native applications.",
		website: "https://reactjs.org",
		colour: "#61dafb",
		icon: IconBrandReact,
	},
	[Technology.Rust]: {
		description:
			"Performant memory-safe programming language and toolset, suitable for robust embedded systems and network services.",
		website: "https://rust-lang.org",
		colour: "#f75208",
		icon: IconBrandRust,
	},
	[Technology.SvelteKit]: {
		description:
			"Framework which utilises Svelte interface components to build web applications, and provides routing, server-side rendering, and more.",
		website: "https://svelte.dev",
		colour: "#ff4408",
		icon: IconBrandSvelte,
	},
	[Technology.Tailwind]: {
		description: "A utility-first CSS framework leveraged directly in code markup.",
		website: "https://tailwindcss.com",
		colour: "#1dc0cd",
		icon: IconBrandTailwind,
	},
	[Technology.TypeScript]: {
		description: "Strongly typed superset of JavaScript, which compiles to plain JavaScript.",
		website: "https://typescriptlang.org",
		colour: "#377cc8",
		icon: IconBrandTypescript,
	},
	[Technology.Vite]: {
		description: "A build tool",
		website: "https://vitejs.dev",
		colour: "#ffcd25",
		icon: IconBrandVite,
	},
} satisfies SkillsCollection;
