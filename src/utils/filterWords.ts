import {IWord} from 'models/word.interface';
import {NullableString} from 'utils/types';

export const filterWordsByParams = (data: IWord[], search: NullableString, partFilter?: NullableString) => {
	return data
		.filter(detail => detail.word.startsWith(search ?? ''))
		.map(detail => {
			const filterDefs: string[] = [];
			const hiddenDefs: string[] = [];
			detail.defs?.forEach(def => {
				const [part, definition] = def.split('\t');

				if(part === partFilter || !partFilter) {
					filterDefs.push(def);
				} else {
					hiddenDefs.push(def);
				}
			});
			return {
				...detail,
				defs: filterDefs,
				hiddenDefs
			};
		})
		.filter(word => word.defs?.length > 0);
};