import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import starredWordsSlice from 'slices/starredWordsSlice';

const persistConfig = {
	key: 'root',
	storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
	starredWords: starredWordsSlice
}));

export const store = configureStore({
	reducer: { persistedReducer },
	middleware: [thunk]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;