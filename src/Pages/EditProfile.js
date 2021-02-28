import React, { useState } from "react";
import { Card } from "react-bootstrap";
import EditAbout from "../components/EditAbout";
import EditSkills from "../components/EditSkills";

const Trial2 = () => {
	return <div>22222222</div>;
};

const EditProfile = () => {
	const [about, setAbout] = useState(true);
	const [education, setEducation] = useState(false);
	const [skills, setSkills] = useState(false);
	return (
		<section
			style={{
				padding: "0 10%",
				marginTop: "3rem",
			}}
			className="d-flex flex-row justify-content-around"
		>
			<Card
				className=" shadow border-0"
				style={{ width: "18%", height: "230px" }}
			>
				<Card.Header className="bg-white h5">Settings</Card.Header>
				<Card.Body style={{ padding: "0.5rem 1.25rem" }}>
					<ul
						style={{
							listStyle: "none",
							padding: "0",
						}}
					>
						<li
							className={about ? "editActive editCursor" : "editCursor"}
							style={{
								paddingLeft: "1rem",
								margin: "0rem 0",
								padding: "0.5rem 0.5rem 0.5rem 1rem",
							}}
							onClick={() => {
								setAbout(true);
								setEducation(false);
								setSkills(false);
							}}
						>
							About
						</li>
						<li
							className={
								education ? "editActive editCursor mt-3" : "editCursor mt-3"
							}
							style={{
								paddingLeft: "1rem",
								margin: "0",
								padding: "0.5rem 0.5rem 0.5rem 1rem",
							}}
							onClick={() => {
								setAbout(false);
								setSkills(false);
								setEducation(true);
							}}
						>
							Education
						</li>
						<li
							className={
								skills ? "editActive editCursor mt-3" : "editCursor mt-3"
							}
							style={{
								paddingLeft: "1rem",
								margin: "0",
								padding: "0.5rem 0.5rem 0.5rem 1rem",
							}}
							onClick={() => {
								setAbout(false);
								setEducation(false);
								setSkills(true);
							}}
						>
							Skills
						</li>
					</ul>
				</Card.Body>
			</Card>
			<Card className="w-50 shadow border-0 pb-5">
				<Card.Header
					className="border-0 bg-white"
					style={{
						padding: "0.5rem 1.25rem",
					}}
				>
					{about ? <h3>Personal</h3> : null}
					{education ? <h3>Education</h3> : null}
					{skills ? <h3>Skills</h3> : null}
					<p>General Information</p>
				</Card.Header>
				<Card.Body style={{ padding: "0 1.25rem" }}>
					{about ? <EditAbout /> : null}
					{education ? <Trial2 /> : null}
					{skills ? <EditSkills /> : null}
				</Card.Body>
			</Card>
			<Card className="w-25 shadow border-0" style={{ height: "250px" }}></Card>
		</section>
	);
};

export default EditProfile;
