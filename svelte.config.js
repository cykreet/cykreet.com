import vercelAdapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { visit } from "unist-util-visit";

export function wrapImages() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (parent == null || index == null) return;

			if (node.tagName === "p") {
				const children = node.children.filter((c) => !(c.type === "text" && c.value.trim() === ""));
				if (children.length !== 1 || children[0].tagName !== "img") return;

				const img = children[0];
				const wrapper = {
					type: "element",
					tagName: "div",
					properties: { className: ["rounded-md", "border-grey-400/40", "p-2", "border-2"] },
					children: [img],
				};

				parent.children.splice(index, 1, wrapper);
			} else if (node.tagName === "a") {
				console.log(node);
				const anchor = {
					type: "element",
					tagName: "a",
					properties: { target: "_blank", rel: "noreferrer", href: node.properties.href },
					children: node.children,
				};

				parent.children.splice(index, 1, anchor);
			}
		});
	};
}

/** @type {import("@sveltejs/kit").Config} */
export default {
	extensions: [".svelte", ".md"],
	preprocess: [mdsvex({ extension: ".md", rehypePlugins: [wrapImages] }), vitePreprocess()],
	kit: {
		adapter: vercelAdapter(),
	},
};
