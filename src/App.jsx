import React, {useEffect} from "react";
import {
	BrowserRouter, Route, Switch, NavLink,
} from "react-router-dom";
import { Provider } from "react-redux";

import Main from "@/components/Main";
import Film from "@/components/Film";

import store from "./store/";
import { getFilms } from '@/store/actions/';


function App() {

	store.dispatch(getFilms())

	return (
		<Provider store={store}>
			<BrowserRouter basename="/">
				<main className="page">
					<div className="page__wrapper">
						<Switch>
							<Route exact path="/">
								<Main></Main>
							</Route>
							<Route path="/film/:id" render={(route) => <Film film={store.getState().films.items.find(film => film.id == route.match.params.id)}></Film>}></Route>
							<Route render={
								() => (
									<div className="container">
										<h2 style={{
											color:" #fff", 
											fontSize: "32px",
										}}>404</h2>
									</div>
								)
							}>
							</Route>
						</Switch>
						
					</div>
				</main>
			</BrowserRouter>
		</Provider>
		
	);
}

export default App;
