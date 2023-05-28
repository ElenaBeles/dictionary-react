import {IExtendedWord} from 'models/word.interface';

export const alphabetSort = (words: IExtendedWord[]) => {
	return words.sort((a, b) => a.word.localeCompare(b.word));
};