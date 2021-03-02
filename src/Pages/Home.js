import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Dropdown,
	Spinner,
} from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import Video from "../video/Video Introduction to life at Codi (full version).mp4";

function Home() {
	const getAlumniStudents = async () => {
		await axios.get(`alumni?page=${pageNumber}`).then((res) => {
			setLoading(false);
			setPagination(res.data.meta);
			setAlumnis(res.data.data);
			setShowPagination(true);
		});
	};

	const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [showPagination, setShowPagination] = useState(false);
	const [pagination, setPagination] = useState([]);
	const [alumnis, setAlumnis] = useState([]);

	useEffect(() => {
		getAlumniStudents();
	}, []);
	return (
		<>
			<main>
				<Card style={{ border: "none" }}>
					<Card.Body
						className="text-center relative"
						style={{
							height: "75vh",
							position: "relative",
							// backgroundImage: `url("https://cdn3.f-cdn.com/files/download/97941784/programmin.jpg")`,
							// backgroundPosition: "center",
							// backgroundSize: "cover",
							// boxShadow: `inset 0 0 0 2000px rgba(25, 46, 66, 0.3)`,
						}}
					>
						<video
							className="shadow-lg"
							autoPlay
							muted
							loop
							style={{
								position: "absolute",
								width: "100%",
								left: "50%",
								top: "45%",
								height: "93%",
								objectFit: "cover",
								transform: "translate(-50%,-50%)",
								zIndex: "0",
							}}
						>
							<source type="video/mp4" src={Video}></source>
						</video>

						<div
							className="vertical-center "
							style={{
								maxWidth: "450px",
								minWidth: "300px",
								background: "#ffffff",
								padding: "15px",
								opacity: "0.5",
							}}
						>
							<h1 className="text-danger">Looking for Web Developers?</h1>
							<Card.Text
								className="text-danger mx-auto font-weight-bold mt-4"
								style={{ maxWidth: "450px", minWidth: "300px" }}
							>
								Get to know our Codi Graduates Below!
							</Card.Text>
						</div>
					</Card.Body>
				</Card>
			</main>
			<div className="w-75 mx-auto" style={{ marginTop: "4rem" }}>
				<div className="d-flex flex-row justify-content-between">
					<h2>Our Students</h2>
					<div>
						<div className="d-flex flex-row justify-content-between">
							<Form>
								<Form.Control
									placeholder="Search"
									style={{
										height: "2.25rem",
										borderRadius: "0px",
										// border: "none",
										outline: "no-outline",
									}}
									className="w-100 outlineColor"
									onChange={(e) => {
										// console.log(e.target.value);
										axios
											.get(
												`http://localhost:8000/api/alumni?search=${e.target.value}`
											)
											.then((res) => {
												console.log(res);
											});
									}}
								/>
							</Form>
							<Dropdown>
								<Dropdown.Toggle
									variant="danger"
									id="dropdown-basic"
									style={{
										height: "2.25rem",
										borderRadius: "0px",
									}}
								>
									All
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
									<Dropdown.Item href="#/action-2">
										Another action
									</Dropdown.Item>
									<Dropdown.Item href="#/action-3">
										Something else
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</div>
				<Container
					fluid={"true"}
					style={{ width: "100%", position: "relative", minHeight: "50vh" }}
					className="mt-5"
				>
					{loading ? (
						<Row>
							<div className="vertical-center">
								<Spinner animation="grow" />
							</div>
						</Row>
					) : (
						<Row lg={3} md={2} sm={1} xs={1}>
							{alumnis.map((alumni, index) => {
								console.log(alumni);
								return (
									<Col key={index} style={{ padding: "0px", margin: "0px" }}>
										<Card
											className="text-center shadow mb-4 mt-3  mx-auto pt-2"
											style={{ width: "85%" }}
										>
											<Link
												to={`/profile/${alumni.id}`}
												style={{ textDecoration: "none", color: "#000" }}
											>
												<Card.Img
													className=" rounded-circle mx-auto mt-2"
													style={{ width: "80px", height: "80px" }}
													variant={"top"}
													src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
												/>
											</Link>
											<Card.Body>
												<Link
													to={`/profile/${alumni.id}`}
													style={{ textDecoration: "none", color: "#000" }}
												>
													<Card.Title>
														{alumni.firstname} {alumni.lastname}
													</Card.Title>
												</Link>
												<Card.Text>Availability</Card.Text>
												<Card.Link
													href="https://www.github.com"
													target="_blank"
												>
													<FaGithub size="2rem" color="#000" />
												</Card.Link>
												<Card.Link
													href="https://www.linkedin.com"
													target="_blank"
												>
													<FaLinkedin size="2rem" color="#0e76a8 " />
												</Card.Link>
											</Card.Body>
										</Card>
									</Col>
								);
							})}
						</Row>
					)}
				</Container>
				{showPagination ? (
					<Pagination
						innerClass="mt-2 pagination justify-content-center mt-5"
						activePage={pagination.current_page}
						totalItemsCount={pagination.total}
						itemsCountPerPage={pagination.per_page}
						itemClass="page-item"
						linkClass="page-link"
						onChange={(pageNumber) => {
							setPageNumber(pageNumber);
						}}
					/>
				) : null}
			</div>
		</>
	);
}

export default Home;
