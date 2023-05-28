import { createSlice } from '@reduxjs/toolkit';
import {IWord} from 'models/word.interface';

const initialState: IWord[] = [];

const starredWords = createSlice({
	name: 'starredWords',
	initialState,
	reducers: {
		addWord(state, action) {
			return Array.isArray(state) ? [action.payload, ...state] : [action.payload];
		},
		deleteWord(state, action) {
			return state.filter(word => word.score !== action.payload.score);
		},
		cleanStarredDictionary() {
			return [];
		}
	}
});

export default starredWords.reducer;
export const { addWord, deleteWord, cleanStarredDictionary } = starredWords.actions;