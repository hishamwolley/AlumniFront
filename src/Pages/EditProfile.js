import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditAbout from "../components/EditAbout";
import EditSkills from "../components/EditSkills";
import axios from "axios";
import EditAuth from "../components/EditAuth";
import ImageUpload from "../components/ImageUpload";

const Trial2 = () => {
	return <div>22222222</div>;
};

const EditProfile = () => {
	const [loading, setLoading] = useState(true);
	const [isAuth, setIsAuth] = useState(false);
	const { id } = useParams();
	const [about, setAbout] = useState(false);
	const [alumniImage, setAlumniImage] = useState(false);
	const [education, setEducation] = useState(false);
	const [skills, setSkills] = useState(false);
	const [alumni, setAlumni] = useState([]);

	const getProfileInfo = async () => {
		axios.get(`alumni/${id}`).then((res) => {
			if (!res.data.isLogged) {
				setAbout(false);
				setLoading(false);
				setAlumniImage(false);
				setIsAuth(true);

				return;
			}
			setAlumni(res.data);
			setLoading(false);
			setAbout(true);
			setAlumniImage(true);
		});
	};

	useEffect(() => {
		getProfileInfo();
	}, []);
	return (
		<>
			{loading ? (
				<div style={{ minHeight: "100vh" }}>
					<div className="vertical-center">
						<Spinner animation="grow" />
					</div>
				</div>
			) : (
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
										if (isAuth) {
											return;
										}
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
										if (isAuth) {
											return;
										}
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
										if (isAuth) {
											return;
										}
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
							{isAuth ? <EditAuth /> : null}
							{about ? <EditAbout alumni={alumni} /> : null}
							{education ? <Trial2 /> : null}
							{skills ? <EditSkills alumni={alumni} /> : null}
						</Card.Body>
					</Card>
					<Card
						className="w-25 shadow border-0"
						style={{ height: "100%", padding: "1rem 0" }}
					>
						{alumniImage ? <ImageUpload alumni={alumni} /> : null}
					</Card>
				</section>
			)}
		</>
	);
};

export default EditProfile;
