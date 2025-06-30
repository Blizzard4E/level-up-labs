export type Genre = {
	id: string;
	name: string;
};

export type Publisher = {
	id: string;
	name: string;
};
export type Game = {
	id: string;
	texture: string;
	title: string;
	desc: string;
	genres: Genre[];
	publishers: Publisher[];
	gameplays: string[];
};
