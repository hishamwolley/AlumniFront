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
				<img src={CodiLogo} style={{ width: "9rem" }} />
				<div>
					<Link
						to="/"
						className="mr-4"
						style={{ cursor: "pointer", color: "#dc3545 " }}
					>
						<b>Home</b>
					</Link>
					<a
						href="https://codi.tech/about/"
						className="mr-4"
						style={{ cursor: "pointer", color: "#dc3545" }}
					>
						<b>About</b>
					</a>

					{token ? (
						<Link
							to={`/profile/${alumniId}`}
							className="mr-4"
							style={{ cursor: "pointer", color: "#dc3545" }}
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
							variant="danger"
							style={{ borderRadius: "3px" }}
						>
							Logout
						</Button>
					) : (
						<Button
							onClick={() => {
								setShowLogin(true);
							}}
							// className=" loginButton"
							style={{
								borderRadius: "3px",
								background: "#dc3545",
								borderColor: "#dc3545",
							}}
						>
							<b>Login</b>
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
