import React, { useState } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditSkills = ({ alumni }) => {
	const { id } = useParams();
	const [skills, setSkills] = useState(alumni.skills);
	const [skillName, setSkillName] = useState();
	const [dupErr, setDupErr] = useState(false);
	return (
		<div>
			<div className="d-flex flex-row align-items-center mt-4 ">
				<div
					style={{
						width: "45%",
						borderBottom: "1px solid rgba(0,0,0,0.3)",
						display: "inline-block",
					}}
				></div>
				<span className="mx-2 small text-secondary text-center">Skills</span>
				<div
					style={{
						width: "45%",
						borderBottom: "1px solid rgba(0,0,0,0.3)",
						display: "inline-block",
					}}
				></div>
			</div>

			<Card className="mt-5">
				<Card.Header>
					<div className="d-flex flex-row justify-content-between align-items-center">
						<div>
							<p>Add Skills</p>
							{dupErr ? (
								<p className="text-danger small">Can't add duplicate skills</p>
							) : null}

							<span className="position-relative fixed-bottom font-italic text-secondary small">
								You can add up to 12 Skills!
							</span>
						</div>

						<form
							className="form-group d-flex flex-row "
							onSubmit={(e) => {
								// console.log
								const skill = { skill: skillName };
								axios
									.post(`/alumni/${id}?_method=PUT`, skill)
									.then((res) => {
										setDupErr(false);
										setSkills(res.data.alumni);
									})
									.catch((e) => {
										const err = e.response.data.message;
										if (err.includes("No Duplicates skills allowed")) {
											setDupErr(true);
										}
									});
								e.target.reset();
								e.preventDefault();
							}}
						>
							<input
								placeholder="Skill Name"
								maxLength="12"
								className="w-100 shadow-none form-control"
								type="text"
								onChange={(e) => {
									setSkillName(e.target.value);
								}}
							/>
							<Button size="sm ml-2" type="submit">
								+
							</Button>
						</form>
					</div>
				</Card.Header>
				<Card.Body>
					<Row
						className=" w-75  mx-auto  text-center"
						lg={3}
						md={2}
						sm={1}
						xs={1}
					>
						{skills.map((skill, index) => {
							return (
								<div
									className="d-flex align-items-center text-center justify-content-center "
									key={index}
								>
									<span className="d-flex align-items-center m-2">
										{skill.name}
										<AiFillDelete
											style={{ cursor: "pointer" }}
											color="red"
											size="1.25rem"
											onClick={() => {
												const temp = [...skills];
												temp.splice(index, 1);
												setSkills(temp);
											}}
										/>
									</span>
								</div>
							);
						})}
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
};

export default EditSkills;
