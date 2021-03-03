import React from "react";
import { Card } from "react-bootstrap";
import {
	FaGithub,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";
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
						<a
							href="https://codi.tech/about/"
							className="footerLinks"
							target="_blank"
						>
							About Codi
						</a>
					</p>

					<p>
						<a
							href="https://codi.tech/our-team/"
							className="footerLinks"
							target="_blank"
						>
							Our Team
						</a>
					</p>

					<p>
						<a
							href="https://codi.tech/codi-kids/"
							className="footerLinks"
							target="_blank"
						>
							Codi Kids
						</a>
					</p>

					<p>
						<a
							href="https://codi.tech/contact/"
							className="footerLinks"
							target="_blank"
						>
							Contact Us
						</a>
					</p>
				</div>
				<div className="w-25 footerSpacing">
					<p className=" text-center h5 w-100" style={{ color: "#ffffff" }}>
						Follow us on Social Media
					</p>
					<div className="d-flex flex-row justify-content-center mt-4">
						<div className="p-2 border mx-2 ">
							<a href="https://www.facebook.com/coditechlb/" target="_blank">
								<FaFacebook color="white" size="1.5rem" className="mx-1" />
							</a>
						</div>
						<div className="p-2 border mx-2 ">
							<a href="https://twitter.com/codi_tech" target="_blank">
								<FaTwitter color="white" size="1.5rem" className="mx-1" />
							</a>
						</div>
						<div className="p-2 border mx-2">
							<a href="https://www.instagram.com/codi_tech/" target="_blank">
								<FaInstagram
									color="white"
									size="1.5rem"
									border
									className="mx-1"
								/>
							</a>
						</div>

						<div className="p-2 border mx-2">
							<a
								href="https://www.linkedin.com/school/codi.tech/"
								target="_blank"
							>
								<FaLinkedin color="white" size="1.5rem" className="mx-1" />
							</a>
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
