import { GITHUB_ACCESS_TOKEN, GITHUB_GLOBAL_ID } from "$env/static/private";
import { storedQuery } from "$lib/storage/stored-fetch";
import type { LayoutServerLoad } from "./$types";

export interface CommitDataQuery {
	data: {
		viewer: {
			repositories: {
				nodes: {
					name: string;
					url: string;
					defaultBranchRef: {
						target: {
							history: {
								edges: {
									node: {
										author: {
											avatarUrl: string;
											name: string;
										};
										message: string;
										committedDate: string;
										url: string;
									};
								}[];
							};
						};
					};
				}[];
			};
		};
	};
}

export const load = (async () => {
	const commitData = storedQuery<CommitDataQuery>(
		"events",
		"https://api.github.com/graphql",
		`
  query {
  viewer {
    repositories(
			first: 10,
			orderBy: {field: PUSHED_AT, direction: DESC}
			affiliations: [OWNER, COLLABORATOR]
		) {
      nodes {
        name
        url
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 5, author: { id: "${GITHUB_GLOBAL_ID}" }) {
                edges {
                  node {
                    author {
                      avatarUrl
                      name
                    }
                    message
                    committedDate
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`,
		{
			headers: {
				Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		},
	);

	return { commitData: await commitData };
}) satisfies LayoutServerLoad;

// export const prerender = true;
export const ssr = true;
