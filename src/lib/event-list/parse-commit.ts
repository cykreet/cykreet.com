export interface ConvetionalCommit {
	type?: string;
	scope?: string;
	classes?: string;
	description: string;
}

type CommitType = [string, [name: string, classes: string]];

const DEFAULT_TYPE = ["Other", "!text-gray-500 !border-gray-500"];
const commitTypes: CommitType[] = [
	["feat", ["Feature", "!text-green-500 !border-green-500"]],
	["fix", ["Fix", "!text-red-500 !border-red-500"]],
	["docs", ["Docs", "!text-blue-500 !border-blue-500"]],
	["style", ["Styles", "!text-purple-500 !border-purple-500"]],
	["refactor", ["Refactor", "!text-orange-500 !border-orange-500"]],
	["perf", ["Performance", "!text-yellow-500 !border-yellow-500"]],
	["test", ["Tests", "!text-indigo-500 !border-indigo-500"]],
	["build", ["Build", "!text-magenta-500 !border-magenta-500"]],
	["ci", ["CI", "!text-teal-500 !border-teal-500"]],
	["chore", ["Chores", "!text-gray-500 !border-gray-500"]],
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
