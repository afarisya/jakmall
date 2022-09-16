import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled from 'styled-components'
import { useForm, FormProvider } from "react-hook-form";

import { Menu, MenuItem, MenuSeparator } from './components/Menu';
import { Card } from './components/Card'

import './App.css';

import { routes } from "./routes";


const Container = styled.div`
	height: 100vh;
	width: 100vw;
	padding: 20px 10px;
	background-color: #FFFAE6;
`;

function App() {
	const location = useLocation();
	const methods = useForm();
	
	return (
		<FormProvider {...methods} >
		<div className="App">
			<Container>
				<Menu>
					{ routes.map(({id, title, path}, index) => {
						let active = false;
						const active_index = routes.findIndex(({path}) => path === location.pathname);
						if ( index <= active_index ) {
							active = true;
						}
						return (
							<React.Fragment key={id}>
								<MenuItem index={id} active={active}>{title}</MenuItem>
								{ index < routes.length - 1 && <MenuSeparator /> }
							</React.Fragment>
						)
					}) }
				</Menu>
				<Card>
					<Routes>
						{ routes.map(({id, path, element}) => {
							return (
								<Route key={id} exact path={path} element={element} />
							)
						}) }
						<Route
							path="*"
							element={<Navigate to={routes[0].path} replace />}
						/>
					</Routes>
				</Card>
			</Container>
		</div>
		</FormProvider>
	);
}

export default App;
