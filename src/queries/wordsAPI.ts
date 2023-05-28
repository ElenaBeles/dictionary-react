import axios from 'axios';
import {QueryFunctionContext} from 'react-query';
import {IWord} from 'models/word.interface';

export const getWords = async ({ queryKey }: QueryFunctionContext): Promise<IWord[]> => {
	const [_, startWord] = queryKey;

	const response = await axios.get('https://api.datamuse.com/words', {
		params: {
			sp: startWord + '*',
			md: 'd+p'
		}
	});
	return response.data;
};