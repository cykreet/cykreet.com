export enum EventType {
	PushEvent = "PushEvent",
	WatchEvent = "WatchEvent",
}

// export interface GithubEvent {
// 	type: EventType;
// 	public: boolean;
// 	created_at: string;
// 	actor: {
// 		id: number;
// 		login: string;
// 		display_login: string;
// 		gravatar_id: string;
// 		url: string;
// 		avatar_url: string;
// 	};
// 	repo: {
// 		id: number;
// 		name: string;
// 		url: string;
// 	};
// 	payload: {
// 		repository_id: number;
// 		push_id: number;
// 		size: number;
// 		distinct_size: number;
// 		ref: string;
// 		head: string;
// 		before: string;
// 		commits: {
// 			sha: string;
// 			author: {
// 				email: string;
// 				name: string;
// 			};
// 			message: string;
// 			distinct: boolean;
// 			url: string;
// 		}[];
// 	};
// }

export interface Commit {
	repo: string;
	url: string;
	message: string;
	date: string;
	author: {
		name: string;
		avatar_url: string;
	};
}
