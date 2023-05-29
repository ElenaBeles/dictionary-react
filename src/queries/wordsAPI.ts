import axios from 'axios';
import {QueryFunctionContext} from 'react-query';
import {IWord} from 'models/word.interface';
import {API_URL} from 'constants/api';

export const getWords = async ({ queryKey }: QueryFunctionContext): Promise<IWord[]> => {
	const [_, startWord] = queryKey;

	const response = await axios.get(`${API_URL}` + '/words', {
		params: {
			sp: startWord + '*',
			md: 'd+p'
		}
	});
	return response.data;
};