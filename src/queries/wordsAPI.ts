import axios from 'axios';
import {QueryFunctionContext} from 'react-query';

export const getWords = async ({ queryKey }: QueryFunctionContext) => {
	const [_, startWord] = queryKey;

	const response = await axios.get('https://api.datamuse.com/words', {
		params: {
			sp: startWord + '*',
			md: 'd+p'
		}
	});
	return response.data;
};