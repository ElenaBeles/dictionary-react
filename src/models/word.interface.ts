export interface IWord {
	word: string;
	defs: string[];
	tags: string[];
	score: string;
}

export interface IExtendedWord extends IWord{
	hiddenDefs: string[];
}