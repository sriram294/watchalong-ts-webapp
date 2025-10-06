export interface GroupMovie {
	id: number;
    movieId: number;
    title: string;
	movie: {
		id: string;
		title: string;
	};
    poster_path: string | null;
    vote_average: number;
	upvotedByNames: string[];
	downvotedByNames: string[];
	reviews: any[];
}