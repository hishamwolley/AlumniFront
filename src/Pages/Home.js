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
import { ImVolumeMute2, ImVolumeMedium } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import Video from "../video/Video Introduction to life at Codi (full version).mp4";

function Home() {
	const getAlumniStudents = async () => {
		await axios.get(`approved?page=${pageNumber}`).then((res) => {
			console.log(res.data);
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
	const [mute, setMute] = useState(true);

	useEffect(() => {
		getAlumniStudents();
	}, [pageNumber]);
	return (
		<>
			<main>
				<Card style={{ border: "none" }}>
					<Card.Body
						className="text-center relative"
						style={{
							height: "80vh",
							position: "relative",
						}}
					>
						<video
							className="shadow-lg"
							muted={mute}
							autoPlay
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
						<div
							style={{
								bottom: "3rem",
								position: "absolute",
								left: "1.5rem",
								cursor: "pointer",
							}}
							className="h1"
						>
							{mute ? (
								<ImVolumeMedium
									style={{ opacity: 0.5 }}
									onClick={() => {
										setMute(!mute);
									}}
									color="#ffbf0e"
								/>
							) : (
								<ImVolumeMute2
									style={{ opacity: 0.5 }}
									onClick={() => {
										setMute(!mute);
									}}
									color="007cba"
								/>
							)}
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
										outline: "no-outline",
									}}
									className="w-100 outlineColor"
									onChange={(e) => {
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
													src={`http://localhost:8000/storage/images/${alumni.image}`}
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
												<div className=" mb-3 d-flex flex-row justify-content-center align-items-center">
													<p className="m-0">Availabile</p>
													{alumni.availability == 1 ? (
														<div
															// className="bg-red "
															style={{
																marginLeft: "0.25rem",
																borderRadius: "50%",
																background: "green",
																width: "1rem",
																height: "1rem",
																display: "block",
															}}
														></div>
													) : (
														<div
															style={{
																marginLeft: "0.25rem",
																borderRadius: "50%",
																background: "red",
																width: "1rem",
																height: "1rem",
																display: "block",
															}}
														></div>
													)}
												</div>
												<Card.Link href={alumni.github} target="_blank">
													<FaGithub size="2rem" color="#000" />
												</Card.Link>
												<Card.Link href={alumni.linkedin} target="_blank">
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
