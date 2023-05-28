import {combineReducers, configureStore} from '@reduxjs/toolkit';
import starredWordsSlice from 'slices/starredWordsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';


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

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;