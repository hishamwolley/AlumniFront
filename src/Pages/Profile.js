import React, { useEffect, useState, useContext } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../components/UserContext";
import cookie from "js-cookie";

const Profile = () => {
	const { id } = useParams();
	const [alumni, setAlumni] = useState({});
	const [isLogged, setIsLogged] = useState(false);
	const getUserInfo = async () => {
		await axios.get(`/alumni/${id}`).then((res) => {
			setAlumni(res.data.data);
			if (res.data.isLogged) {
				setIsLogged(true);
			}
		});
	};
	useEffect(() => {
		axios.defaults.headers.common["Authorization"] =
			"bearer " + cookie.get("token");
		getUserInfo();
	}, [id]);
	return (
		<main
			id="profile"
			className="d-flex flex-row mx-auto mt-4"
			style={{
				paddingLeft: "1.5rem",
				borderRadius: "10px",
				width: "75%",
				margin: "0 auto",
			}}
		>
			<Card
				style={{ width: "40%" }}
				className=" mt-3 shadow mr-5 p-2"
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
								src="https://i.guim.co.uk/img/media/2989811a5ef7eab9d1e06286fea02a2ab52e670d/0_97_4927_2957/master/4927.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=618f5d45b2225b0cc174f5568bcbd1f9"
								// src={`http://localhost:8000/storage/images/${alumni.image}`}
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
							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>
							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>
							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>
							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>

							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>
							<div className="d-flex flex-row align-items-center justify-content-between w-75 mx-auto pl-2 mt-2">
								<div className="pt-1">
									<span>Javascript</span>
								</div>
								<StarRatings
									rating={4}
									starRatedColor="#fada5e"
									// changeRating={this.changeRating}
									numberOfStars={5}
									starDimension={"1rem"}
									starSpacing="2px"
									name="rating"
								/>
							</div>
						</article>
					</section>
				</Card.Body>
			</Card>

			<Card
				className=" mt-3 shadow"
				style={{ width: "65%" }}
				id="profile-right"
			>
				{isLogged ? (
					<Card.Header className="text-center flex-row d-flex justify-content-end">
						<Link to="www.google.com">Edit</Link>
					</Card.Header>
				) : null}

				<Card.Body>
					<section className="px-5 ">
						<section className="w-25 mx-auto">
							<div className=" d-flex flex-row mt-5 justify-content-center">
								<FaGithub size="2rem" />
								<FaLinkedin size="2rem" color="#0e76a8" className="ml-3" />
							</div>
							<div className="flex-row d-flex justify-content-center align-items-center mt-4 ">
								<div
									style={{
										width: "1rem",
										height: "1rem",
										background: "green",
										borderRadius: "50%",
									}}
								></div>
								<span className="ml-3">Available</span>
							</div>
						</section>
						<hr className="mt-5" />
						<Tabs
							defaultActiveKey="About"
							id="uncontrolled-tab-example"
							style={{ marginTop: "3rem", textAlign: "left" }}
						>
							<Tab eventKey="About" title="About">
								<p className="mt-5  text-secondary small">
									Contact Information
								</p>
								<div className="flex-row d-flex justify-content-between mt-4 ">
									<p>Email</p>
									<span className="text-primary" style={{ width: "40%" }}>
										{alumni.email}
									</span>
								</div>
								<div className="flex-row d-flex justify-content-between ">
									<p>Location</p>
									<span style={{ width: "40%" }} className="text-primary">
										{alumni.city}
									</span>
								</div>
								<div className="flex-row d-flex justify-content-between ">
									<p>Phone</p>
									<span style={{ width: "40%" }} className="text-primary">
										{alumni.phone}
									</span>
								</div>
								<p className="mt-2  text-secondary small">Basic Information</p>

								<div className="flex-row d-flex justify-content-between mt-4 ">
									<p>Birthday</p>
									<span style={{ width: "40%" }}>{alumni.birthdate}</span>
								</div>

								<div className="flex-row d-flex justify-content-between ">
									<p>Cohort</p>
									<span style={{ width: "40%" }}>B0{alumni.cohort}</span>
								</div>
								<div className="flex-row d-flex justify-content-between  ">
									<p>Flexibility</p>
									<span style={{ width: "40%" }}>
										{alumni.flexibility ? "Yes" : "No"}
									</span>
								</div>
							</Tab>
							<Tab eventKey="Education" title="Education">
								<p className="mt-4">2</p>
							</Tab>
						</Tabs>
					</section>
				</Card.Body>
			</Card>
		</main>
	);
};

export default Profile;
