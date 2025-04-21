// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import MainIDE from './MainIDE';

import { loadSavedGlobalTheme, saveGlobalTheme, loadSavedEditorTheme, saveEditorTheme } from "./utils/storage"

//Router
function App({docUrl}) {
	// Dark Mode Settings
	const [globalThemeDark, setGlobalThemeDark] = useState(loadSavedGlobalTheme());
	const [editorThemeDark, setEditorThemeDark] = useState(loadSavedEditorTheme());

	const DarkTheme = {
		global:{
			value:globalThemeDark, 
			set:setGlobalThemeDark
		},
		editor:{
			value:editorThemeDark, 
			set:setEditorThemeDark
		}
	};

	// Save to localStorage whenever it changes
	useEffect(() => saveGlobalTheme(globalThemeDark), [globalThemeDark]);
	useEffect(() => saveEditorTheme(editorThemeDark), [editorThemeDark]);

	return (
		<Router>
			<Routes>
				{/* Redirect root "/" to "/login" */}
				<Route
					path="/"
					element={
						<MainIDE
							DarkTheme={DarkTheme}
							docUrl={docUrl}
						/>
					}
				/>

				{/* Login page */}
				<Route
					path="/login"
					element={
						<LoginBox />
					}
				/>

				{/* Register page */}
				<Route
					path="/register"
					element={
						<RegisterBox />
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
