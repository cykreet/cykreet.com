export interface ConvetionalCommit {
	type?: string;
	scope?: string;
	classes?: string;
	description: string;
}

type CommitType = [string, [name: string, classes: string]];

const DEFAULT_TYPE = ["Other", "group-hover:text-gray-500 group-hover:border-gray-500"];
const commitTypes: CommitType[] = [
	["feat", ["Feature", "group-hover:text-green-500 group-hover:border-green-500"]],
	["fix", ["Fix", "group-hover:text-red-500 group-hover:border-red-500"]],
	["docs", ["Docs", "group-hover:text-blue-500 group-hover:border-blue-500"]],
	["style", ["Styles", "group-hover:text-purple-500 group-hover:border-purple-500"]],
	["refactor", ["Refactor", "group-hover:text-orange-500 group-hover:border-orange-500"]],
	["perf", ["Performance", "group-hover:text-yellow-500 group-hover:border-yellow-500"]],
	["test", ["Tests", "group-hover:text-indigo-500 group-hover:border-indigo-500"]],
	["build", ["Build", "group-hover:text-magenta-500 group-hover:border-magenta-500"]],
	["ci", ["CI", "group-hover:text-teal-500 group-hover:border-teal-500"]],
	["chore", ["Chore", "group-hover:text-gray-500 group-hover:border-gray-500"]],
];

export function parseConventionalCommit(message: string): ConvetionalCommit {
	const [header] = message.split("\n");
	if (!header?.includes(":")) return { description: message };

	const [start, ...description] = header.split(":");
	const [type, scope] = start!.split("(");
	const prettyType = commitTypes.find(([key]) => key === type)?.[1] ?? DEFAULT_TYPE;
	return {
		type: prettyType[0],
		classes: prettyType[1],
		scope: scope?.slice(0, -1),
		description: description.join(":").trim(),
	};
}
