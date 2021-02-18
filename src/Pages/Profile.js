import React from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import { FaGithub, FaFacebook } from "react-icons/fa";

const Profile = () => {
	return (
		<main
			className="d-flex flex-col "
			style={{
				margin: "3rem 12.5% 0 12.5%",
				background: "#f5f5f5	",
				padding: "1.5rem",
			}}
		>
			<section style={{ width: "25%" }} className="mr-5">
				<Card style={{ width: "100%" }}>
					<Card.Img
						variant="top"
						src="https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg"
					/>
				</Card>
				<article className="text-center mt-4 smallText">
					<div className="d-flex flex-row align-items-center">
						<span
							style={{ display: "inline" }}
							className="mr-2 font-weight-bold text-secondary"
						>
							Description
						</span>
						<div
							style={{
								width: "100%",
								borderBottom: "1px solid rgba(0,0,0,0.3)",
								display: "inline-block",
							}}
						></div>
					</div>
					<p className="mt-4">
						lorem "Sed ut perspiciatis unde omnis iste natus error sit
						voluptatem accusantium doloremque laudantium, totam rem aperiam,
						eaque ipsa quae ab illo inventore veritatis et quasi architecto
					</p>
				</article>
				<article className="text-center mt-4 smallText">
					<div className="d-flex flex-row align-items-center">
						<span
							style={{ display: "inline" }}
							className="mr-2 font-weight-bold text-secondary"
						>
							Skills
						</span>
						<div
							style={{
								width: "100%",
								borderBottom: "1px solid rgba(0,0,0,0.3)",
								display: "inline-block",
							}}
						></div>
					</div>
				</article>
			</section>
			<section className="ml-5">
				<div className="d-flex flex-row align-items-center">
					<h4 className="d-inline-block mr-2">Firstname Lastname</h4>
					{/* <span className="font-weight-light small">
							Beirut <MdLocationOn />
						</span> */}
				</div>
				<span className="small text-primary">Web Developer</span>
				<div className="w-25 d-flex flex-row justify-content-around mt-4">
					<FaGithub size="2rem" />
					<FaFacebook size="2rem" />
				</div>
				<Tabs
					defaultActiveKey="About"
					id="uncontrolled-tab-example"
					style={{ marginTop: "5rem", minWidth: "375px" }}
				>
					<Tab eventKey="About" title="About">
						<p className="mt-4 small text-secondary">Contact Information</p>
						<div className="flex-row d-flex justify-content-between small">
							<p>Email</p>
							<span className="text-primary">JohnDoe@gmail.com</span>
						</div>
						<div className="flex-row d-flex justify-content-between small">
							<p>Location</p>
							<span>Beirut</span>
						</div>
						<div className="flex-row d-flex justify-content-between small">
							<p>Phone</p>
							<span className="text-primary">12345678</span>
						</div>
						<p className="mt-4 small text-secondary">Basic Information</p>

						<div className="flex-row d-flex justify-content-between small">
							<p>Birthday</p>
							<span>10/10/2020</span>
						</div>

						<div className="flex-row d-flex justify-content-between small">
							<p>Cohort</p>
							<span>B06</span>
						</div>
						<div className="flex-row d-flex justify-content-between small">
							<p>Flexibility</p>
							<span>Flexibile</span>
						</div>
						<div className="flex-row d-flex justify-content-between small">
							<p>Availability</p>
							<span>Busy</span>
						</div>
					</Tab>
					<Tab eventKey="Education" title="Education">
						<p className="mt-4">2</p>
					</Tab>
				</Tabs>
			</section>
		</main>
	);
};

export default Profile;
