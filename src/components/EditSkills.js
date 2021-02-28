import React, { useState } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const EditSkills = () => {
	const [skills, setSkills] = useState([]);
	const [skillName, setSkillName] = useState();
	return (
		<div>
			<Card>
				<Card.Header>
					<div className="d-flex flex-row justify-content-between align-items-center">
						<div>
							<p>Add Sections</p>
							<span className="position-relative fixed-bottom font-italic text-secondary small">
								Note: You can add up to 6 sections to begin with.
							</span>
						</div>
						<div className="form-group d-flex flex-row ">
							<input
								placeholder="Add New Section"
								maxLength="5"
								className="w-100 shadow-none form-control"
								type="text"
								value={skillName}
								onChange={(e) => {
									setSkillName(e.target.value);
								}}
							/>
							<Button
								size="sm ml-2"
								onClick={() => {
									console.log("clicked");
									// if (skills.length === 0) {
									// 	// setError(true);
									// 	return;
									// } else {
									// 	// setError(false);
									// }
									// if (skills.length >= 6) {
									// 	alert("Maximum amount of sections added");
									// 	return;
									// }
									setSkills([...skills, skillName]);
									setSkillName("");
									console.log(skills);
								}}
							>
								+
							</Button>
						</div>
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
						{skills.map((sec, index) => {
							return (
								<div
									className="d-flex align-items-center text-center justify-content-center "
									key={index}
								>
									<span className="d-flex align-items-center m-2">
										{` ${sec}`}
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
