import React, { useEffect, useState, useContext } from "react";
import { Card, Tabs, Tab, Row, Col, Spinner, Modal } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../components/UserContext";
import cookie from "js-cookie";

const Profile = () => {
	const { token, setToken } = useContext(UserContext);
	const { id } = useParams();
	const [alumni, setAlumni] = useState({});
	const [alumniSkills, setAlumniSkills] = useState([]);
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(true);
	const getUserInfo = async () => {
		await axios.get(`/alumni/${id}`).then((res) => {
			setAlumniSkills(res.data.skills);
			setLoading(false);
			setAlumni(res.data.data);
			if (res.data.isLogged) {
				setIsLogged(true);
			}
		});
	};
	const skillMap = alumniSkills.map((skill) => {
		return (
			<Col className="p-0 ">
				<p
					className="small shadow-sm border rounded p-1"
					style={{ display: "inline-block", minWidth: "4rem" }}
				>
					{skill.name}
				</p>
			</Col>
		);
	});

	useEffect(() => {
		axios.defaults.headers.common["Authorization"] =
			"bearer " + cookie.get("token");
		if (!cookie.get("token")) {
			setIsLogged(false);
		}
		getUserInfo();
	}, [id, token]);
	return (
		<main
			id="profile"
			className="d-flex flex-row mx-auto mt-4"
			style={{
				minHeight: "50vh",
				paddingLeft: "1.5rem",
				borderRadius: "10px",
				width: "75%",
				margin: "0 auto",
			}}
		>
			{loading ? (
				<div className="vertical-center">
					<Spinner animation="grow" />
				</div>
			) : (
				<>
					{" "}
					<Card
						style={{ width: "40%" }}
						className=" mt-3 shadow mr-5 p-2 border-0"
						id="profile-left"
					>
						<Card.Body>
							<section className="text-center">
								<div
									className="mx-auto mt-3"
									style={{ width: "15rem", height: "15rem" }}
								>
									<img
										className="rounded-circle shadow-lg "
										style={{ width: "100%", minHeight: "100%" }}
										src={`http://localhost:8000/storage/images/${alumni.image}`}
									/>
								</div>
								<h4 className="mt-4">
									{alumni.firstname} {alumni.lastname}
								</h4>

								<article className="text-left mt-5 smallText">
									<div className="d-flex flex-row align-items-center ">
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
									<p className="mt-4 pl-3 text-center">
										{/* lorem "Sed ut perspiciatis unde omnis iste natus error sit
								voluptatem accusantium doloremque laudantium, totam rem aperiam,
								eaque ipsa quae ab illo inventore veritatis et quasi architecto */}
										{alumni.description}
									</p>
								</article>
								<article className="text-center mt-4 smallText ">
									<div className="d-flex flex-row align-items-center mb-3">
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
									<Row
										lg={3}
										md={2}
										sm={2}
										xs={2}
										style={{ width: "81%" }}
										className=" m-0 mx-auto"
									>
										{alumniSkills ? skillMap : null}
									</Row>

									{/* <div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2"> */}
									{/* <p>asdas</p> */}
									{/* <p>asdas</p> */}
									{/* </div> */}
								</article>
							</section>
						</Card.Body>
					</Card>
					<Card
						className=" mt-3 shadow border-0 pb-2"
						style={{ width: "65%" }}
						id="profile-right"
					>
						{isLogged ? (
							<Card.Header className="text-center flex-row d-flex justify-content-end">
								<Link to={`/edit/${alumni.id}`}>Edit</Link>
							</Card.Header>
						) : null}
						<Card.Body>
							<section className="px-3 ">
								<section className="w-25 mx-auto">
									<div className=" d-flex flex-row justify-content-center mt-3">
										<Link to={alumni.github} style={{ textDecoration: "none" }}>
											<FaGithub size="2rem" color="black" />
										</Link>
										<Link to={alumni.linkedin}>
											<FaLinkedin
												size="2rem"
												color="#0e76a8"
												className="ml-3"
											/>
										</Link>
									</div>
									<div className="flex-row d-flex justify-content-center align-items-center mt-4 ">
										{alumni.availability == 1 ? (
											<div
												style={{
													width: "1rem",
													height: "1rem",
													background: "green",
													borderRadius: "50%",
												}}
											></div>
										) : (
											<div
												style={{
													width: "1rem",
													height: "1rem",
													background: "red",
													borderRadius: "50%",
												}}
											></div>
										)}
										<span className="ml-3">Available</span>
									</div>
								</section>
								{/* <hr className="mt-5" /> */}
								<Tabs
									defaultActiveKey="About"
									id="uncontrolled-tab-example"
									style={{ marginTop: "3rem", textAlign: "left" }}
								>
									<Tab eventKey="About" title="About">
										<div className="d-flex flex-row align-items-center text-center mt-4">
											<div
												style={{
													width: "40%",
													borderBottom: "1px solid rgba(0,0,0,0.3)",
													display: "inline-block",
												}}
											></div>
											<span className=" text-secondary small">
												Contact Information
											</span>
											<div
												style={{
													width: "40%",
													borderBottom: "1px solid rgba(0,0,0,0.3)",
													display: "inline-block",
												}}
											></div>
										</div>

										<div className="flex-row d-flex justify-content-between mt-4 ">
											<p className="font-weight-bold">Email</p>
											<span className="text-primary" style={{ width: "40%" }}>
												{alumni.email}
											</span>
										</div>
										<div className="flex-row d-flex justify-content-between ">
											<p className="font-weight-bold">Location</p>
											<span style={{ width: "40%" }} className="text-primary">
												{alumni.city}
											</span>
										</div>
										<div className="flex-row d-flex justify-content-between ">
											<p className="font-weight-bold">Phone</p>
											<span style={{ width: "40%" }} className="text-primary">
												{alumni.phone}
											</span>
										</div>
										<div className="d-flex flex-row align-items-center text-center mt-2">
											<div
												style={{
													width: "40%",
													borderBottom: "1px solid rgba(0,0,0,0.3)",
													display: "inline-block",
												}}
											></div>
											<span className="text-secondary small">
												General Information
											</span>
											<div
												style={{
													width: "40%",
													borderBottom: "1px solid rgba(0,0,0,0.3)",
													display: "inline-block",
												}}
											></div>
										</div>

										<div className="flex-row d-flex justify-content-between mt-4 align-items-center ">
											<p className="m-0">Birthday</p>
											<span style={{ width: "40%" }}>{alumni.birthdate}</span>
										</div>

										<div className="flex-row d-flex justify-content-between mt-4  align-items-center">
											<p className="m-0">Cohort</p>
											<span style={{ width: "40%" }}>B0{alumni.cohort}</span>
										</div>
										<div className="flex-row d-flex justify-content-between mt-4  align-items-center">
											<p className="m-0">Flexibile</p>
											<span style={{ width: "40%" }}>
												{alumni.flexibility ? "Yes" : "No"}
											</span>
										</div>

										<div className="flex-row d-flex justify-content-between mt-4  align-items-center">
											<p className="m-0">Cv</p>
											<a
												target="_blank"
												href={`http://localhost:8000/storage/pdfs/${alumni.pdf}`}
												style={{ width: "40%" }}
											>
												Check me out!
											</a>
										</div>
									</Tab>
									<Tab eventKey="Education" title="Education">
										<p className="mt-4">2</p>
									</Tab>
								</Tabs>
							</section>
						</Card.Body>
					</Card>
				</>
			)}
		</main>
	);
};

export default Profile;
