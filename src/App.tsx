import React from 'react';
import {Route, Routes} from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';

import {Starred} from './pages/Starred';
import {Main} from './pages/Main';

import './App.css';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<Routes>
			<Route index element={<Main/>}/>
			<Route path="starred" element={<Starred/>}/>
		</Routes>
	</QueryClientProvider>
);

export default App;