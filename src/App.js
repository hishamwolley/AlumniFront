import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import UserContext from "./components/UserContext";
import jwt_decode from "jwt-decode";
import cookie from "js-cookie";

function App() {
	const [token, setToken] = useState(null);
	const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
	axios.defaults.baseURL = "http://localhost:8000/api/";
	axios.defaults.headers.common["Authorization"] = "bearer " + token;

	useEffect(() => {
		if (cookie.get("token")) {
			setToken(cookie.get("token"));
		}
		if (token) {
			const decoded = jwt_decode(token);
			if (Date.now() >= decoded.exp * 1000) {
				cookie.remove("token");
				setToken(null);
			} else {
				if (decoded.iss !== "http://localhost:8000/api/alumni/login") {
					cookie.remove("token");
					setToken(null);
				}
			}
		}
	}, [token]);

	return (
		<UserContext.Provider value={providerValue}>
			<Router>
				<Header />
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>

						<Route exact path="/profile/:id">
							<Profile />
						</Route>
					</Switch>
				</ScrollToTop>
				<Footer />
			</Router>
		</UserContext.Provider>
	);
}

export default App;
