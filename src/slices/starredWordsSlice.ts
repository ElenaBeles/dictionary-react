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
		changeStarredList(state, action) {
			return [...action.payload];
		},
		cleanStarredList() {
			return [];
		}
	}
});

export default starredWords.reducer;
export const { addWord, deleteWord, changeStarredList, cleanStarredList } = starredWords.actions;