import React from "react";
import { Container, Row, Col, Card, Form, Dropdown } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<main>
				<Card style={{ border: "none" }}>
					<Card.Body
						className="text-center"
						style={{
							height: "75vh",
							backgroundImage: `url("https://cdn3.f-cdn.com/files/download/97941784/programmin.jpg")`,
							backgroundPosition: "center",
							backgroundSize: "cover",
							boxShadow: `inset 0 0 0 2000px rgba(25, 46, 66, 0.3)`,
						}}
					>
						<h1
							className="text-white mx-auto mt-5"
							style={{ maxWidth: "450px", minWidth: "300px" }}
						>
							Looking for Web Developers to fill the gap?
						</h1>
						<Card.Text
							className="text-danger mx-auto font-weight-bold mt-5"
							style={{ maxWidth: "450px", minWidth: "300px" }}
						>
							Get to know our Codi Graduates Below!
						</Card.Text>
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
								/>
							</Form>
							<Dropdown>
								<Dropdown.Toggle
									variant="success"
									id="dropdown-basic"
									style={{ height: "2.25rem", borderRadius: "0px" }}
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
				<Container fluid={"true"} style={{ width: "100%" }} className="mt-5">
					<Row lg={3} md={2} sm={1} xs={1}>
						<Col style={{ padding: "0px", margin: "0px" }}>
							<Card
								className="text-center shadow mb-4 mt-3  mx-auto pt-2"
								style={{ width: "85%" }}
							>
								<Link
									to="/profile"
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
										to="/profile"
										style={{ textDecoration: "none", color: "#000" }}
									>
										<Card.Title>Name Surname</Card.Title>
									</Link>
									<Card.Text>Availability</Card.Text>
									<Card.Link href="https://www.github.com" target="_blank">
										<FaGithub size="2rem" color="#000" />
									</Card.Link>
									<Card.Link href="https://www.linkedin.com" target="_blank">
										<FaLinkedin size="2rem" color="#0e76a8 " />
									</Card.Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default Home;
