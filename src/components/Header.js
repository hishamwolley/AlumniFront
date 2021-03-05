import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { default as CodiLogo } from "../CodiLogo.svg";
import { Link, withRouter } from "react-router-dom";
import LoginModal from "./LoginModal";
import UserContext from "./UserContext";
import axios from "axios";
import cookie from "js-cookie";

const Header = () => {
	const { token, setToken } = useContext(UserContext);
	const [showLogin, setShowLogin] = useState(false);
	const [alumniId, setAlumniId] = useState({});
	if (token) {
		axios.get("profile").then((res) => {
			setAlumniId(res.data.id);
		});
	}
	return (
		<div>
			<header
				className="flex-row d-flex align-items-center absolute  justify-content-between "
				style={{
					margin: "0.5rem 0",
					width: "100%",
					height: "7rem",
					backgroundColor: "#fff",
					padding: "0 10% 0 10%",
				}}
			>
				<Link to="/">
					<img src={CodiLogo} style={{ width: "9rem" }} />
				</Link>
				<div>
					<Link
						to="/"
						className="mr-4"
						style={{ cursor: "pointer", color: "#ff0b79 " }}
					>
						Home
					</Link>
					<a
						href="https://codi.tech/about/"
						className="mr-4"
						style={{ cursor: "pointer", color: "#ff0b79 " }}
					>
						About
					</a>

					{!token && (
						<Link
							to={"/register"}
							className="mr-4"
							style={{ cursor: "pointer", color: "red" }}
						>
							Register
						</Link>
					)}

					{token ? (
						<Link
							to={`/profile/${alumniId}`}
							className="mr-4"
							style={{ cursor: "pointer", color: "red" }}
						>
							Profile
						</Link>
					) : null}
					{token ? (
						<Button
							onClick={async () => {
								await axios.post("logout").then((res) => {
									console.log(res);
									cookie.remove("token");
									setToken(null);
								});
							}}
							className=" loginButton"
							style={{ borderRadius: "3px" }}
						>
							logout
						</Button>
					) : (
						<Button
							onClick={() => {
								setShowLogin(true);
							}}
							className=" loginButton"
							style={{ borderRadius: "3px" }}
						>
							Login
						</Button>
					)}
					<LoginModal
						show={showLogin}
						onHide={() => {
							setShowLogin(false);
						}}
					/>
				</div>
			</header>
		</div>
	);
};

export default withRouter(Header);
