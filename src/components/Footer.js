import React from "react";
import { Card } from "react-bootstrap";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ReactComponent as CodiLogo } from "../CodiLogo.svg";

const Footer = () => {
	return (
		<footer>
			<Card
				className="mt-5"
				style={{
					height: "10rem",
					background: "#192E42",
					borderRadius: "0px",
				}}
			>
				<div
					style={{ padding: "0 10% 0 10%" }}
					className="d-flex flex-row justify-content-between align-items-center"
				>
					<div style={{ marginTop: "3rem" }}>
						<FaGithub color="white" size="2rem" className="mx-1" />
						<FaLinkedin color="white" size="2rem" className="mx-1" />
						<FaInstagram color="white" size="2rem" className="mx-1" />
						<FaFacebook color="white" size="2rem" className="mx-1" />
					</div>
					<CodiLogo style={{ width: "7rem", marginTop: "3rem " }} />
				</div>
			</Card>
		</footer>
	);
};

export default Footer;
