import React from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CodiLogo } from "../CodiLogo.svg";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<header
				className="flex-row d-flex align-items-center absolute  justify-content-between "
				style={{
					width: "100%",
					height: "5rem",
					backgroundColor: "#fff",
					padding: "0 10% 0 10%",
				}}
			>
				<CodiLogo style={{ width: "7rem" }} />
				<div>
					<Link
						to="/"
						className="mr-4"
						style={{ cursor: "pointer", color: "red" }}
					>
						Home
					</Link>
					<a
						href="https://codi.tech/about/"
						className="mr-4"
						style={{ cursor: "pointer", color: "red" }}
					>
						About
					</a>
					<Button className=" loginButton" style={{ borderRadius: "3px" }}>
						Login
					</Button>
				</div>
			</header>
		</div>
	);
};

export default Header;
