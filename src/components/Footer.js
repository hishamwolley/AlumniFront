import React from "react";
import { Card } from "react-bootstrap";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { default as CodiLogoWhite } from "../White.svg";

const Footer = () => {
	return (
		<footer style={{ position: "relative", bottom: "0", width: "100%" }}>
			<Card
				style={{
					height: "22.5rem",
					background: "#192E42",
					borderRadius: "0px",
					marginTop: "5rem",
					padding: "0 12.5% ",
				}}
				className="d-flex flex-row justify-content-between align-items-center"
				id="footerResp"
			>
				<div className="footerSpacing text-center">
					<p>
						<a href="" className="footerLinks">
							About Codi
						</a>
					</p>

					<p>
						<a href="" className="footerLinks">
							Our Team
						</a>
					</p>

					<p>
						<a href="" className="footerLinks">
							Codi Kids
						</a>
					</p>

					<p>
						<a href="" className="footerLinks">
							Contact Us
						</a>
					</p>

					<p>
						<a href="" className="footerLinks">
							Legal
						</a>
					</p>
				</div>
				<div className="w-25 footerSpacing">
					<p className=" text-center h5 w-100" style={{ color: "#ff0b79" }}>
						Follow us on Social Media
					</p>
					<div className="d-flex flex-row justify-content-center mt-4">
						<div className="p-2 border mx-2">
							<FaGithub color="white" size="1.5rem" className="mx-1" />
						</div>
						<div className="p-2 border mx-2">
							<FaLinkedin color="white" size="1.5rem" className="mx-1" />
						</div>
						<div className="p-2 border mx-2">
							<FaInstagram color="white" size="1.5rem" className="mx-1" />
						</div>
						<div className="p-2 border mx-2">
							<FaFacebook color="white" size="1.5rem" className="mx-1" />
						</div>
					</div>
				</div>

				<img
					src={CodiLogoWhite}
					style={{ width: "10rem", marginTop: "3rem ", marginBottom: "2rem" }}
					// className="footerSpacing"
				/>
			</Card>
		</footer>
	);
};

export default Footer;
