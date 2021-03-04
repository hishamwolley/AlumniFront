import React, { useState } from "react";
import Connection from "../undraw_online_friends_x73e (1).svg";
import { Card, Form, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const Register = () => {
	const [formStep, setFormStep] = useState(0);
	const [startDate, setStartDate] = useState(new Date());
	const [phone, setPhone] = useState();
	const [image, setImage] = useState();
	const [imageName, setImageName] = useState("Choose File");

	const schema = yup.object().shape({
		image: yup
			.mixed()
			.required("Please provide an image")
			.test("fileSize", "The Image is to large", (value) => {
				return value && value[0].size <= 10000;
			}),
	});

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm({ mode: "all", validationSchema: schema });

	const completeStep = () => {
		setFormStep((cur) => cur + 1);
	};

	const showStepButton = () => {
		if (formStep > 0) {
			return (
				<Button type={"submit"} disabled={!isValid}>
					Register
				</Button>
			);
		} else {
			return (
				<Button onClick={completeStep} disabled={!isValid}>
					Next
				</Button>
			);
		}
	};
	return (
		<section
			style={{ minHeight: "75vh", padding: "0 5% 0 5%" }}
			className="d-flex flex-row align-items-center text-center justify-content-between mt-5 "
		>
			<section
				style={{
					width: "60%",
				}}
			>
				<h1 style={{ color: "#ffbf0e" }}>Welcome to the Team!</h1>
				<img src={Connection} className="w-100" />
			</section>
			<Card
				style={{ width: "37.5%", borderRadius: "15px" }}
				className="border-0 shadow"
			>
				<Card.Header className="bg-white font-weight-bold h4">
					Sign Up
				</Card.Header>
				<Card.Body>
					<h5>General</h5>
					<Form
						onSubmit={handleSubmit(() => {
							console.log("submit");
						})}
					>
						{formStep >= 0 && (
							<section className={formStep == 1 && "d-none"}>
								<Form.Row className="mt-3">
									<Col>
										<Form.Control
											ref={register({
												required: {
													value: true,
													message: "Enter Firstname",
												},
											})}
											placeholder="First name"
											type="text"
											name="firstname"
										/>
										{errors.firstname && (
											<p className="text-danger small text-center">
												{errors.firstname.message}
											</p>
										)}
									</Col>
									<Col>
										<Form.Control
											ref={register({
												required: {
													value: true,
													message: "Enter Lastname",
												},
											})}
											placeholder="Last name"
											type="text"
											name="lastname"
										/>

										{errors.lastname && (
											<p className="text-danger small text-center">
												{errors.lastname.message}
											</p>
										)}
									</Col>
								</Form.Row>
								<Form.Group controlId="formBasicEmail">
									<div className="d-flex flex-row align-items-center mt-4">
										<Form.Label style={{ width: "35%" }} className="mr-4">
											Email address
										</Form.Label>
										<Form.Control
											ref={register({
												required: "required",
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: "Invalid email address",
												},
											})}
											type="email"
											placeholder="Enter email"
											name="email"
										/>
									</div>

									{errors.email && (
										<p className="text-danger small text-center">
											{errors.email.message}
										</p>
									)}
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<div className="d-flex flex-row align-items-center mt-4">
										<Form.Label style={{ width: "35%" }} className=" mr-4">
											Password
										</Form.Label>
										<Form.Control
											ref={register({
												required: "Password is required",
												maxLength: 20,
												minLength: 6,
											})}
											type="password"
											placeholder="Password"
											name="password"
										/>
									</div>
									{errors.password && (
										<p className="text-danger small text-center">
											{errors.password.message}
										</p>
									)}
								</Form.Group>

								<Form.Group controlId="formPlaintextEmail">
									<div className="d-flex flex-row align-items-center mt-4">
										<Form.Label style={{ width: "35%" }} className="mr-4">
											City
										</Form.Label>
										<Form.Control
											ref={register({
												required: {
													value: true,
													message: "Enter City",
												},
											})}
											type="text"
											placeholder="Enter current City"
											name="city"
										/>
									</div>
									{errors.city && (
										<p className="text-danger small">{errors.city.message}</p>
									)}
								</Form.Group>
								<div>
									<div className="d-flex flex-row text-center mt-4 align-items-center">
										<p style={{ width: "35%" }} className=" mx-auto m-0">
											Phone
										</p>
										<Controller
											as={
												<PhoneInput
													international
													defaultCountry="LB"
													className="w-100"
													placeholder="Enter phone number"
													// value={phone}
													// onChange={setPhone}
												/>
											}
											name="phone"
											control={control}
											rules={{ required: "Phone is required" }}
										/>
									</div>
									{errors.phone && (
										<p className="text-danger small">{errors.phone.message}</p>
									)}
								</div>
								<section>
									<div className="d-flex flex-row text-center mt-4 align-items-center text-center">
										<p
											style={{ width: "30%", display: "inline-block" }}
											className=" m-0 pr-2 "
										>
											D.O.B
										</p>

										<Controller
											control={control}
											name="birthdate"
											rules={{ required: "Birthdate is required" }}
											render={({ onChange, onBlur, value }) => (
												<DatePicker
													placeholderText="Select your birthday"
													className="form-control"
													dateFormat="yyyy/MM/dd"
													onChange={onChange}
													onBlur={onBlur}
													selected={value}
												/>
											)}
										/>
									</div>
									{errors.birthdate && (
										<p className="text-danger small">
											{errors.birthdate.message}
										</p>
									)}
								</section>
							</section>
						)}
						{formStep >= 1 && (
							<section className={formStep == 0 && "d-none"}>
								<Form.File
									className="text-left"
									id="custom-file-translate-scss"
									type="file"
									ref={register}
									label={imageName}
									lang="en"
									custom
									name="image"
									onChange={(e) => {
										console.log(e.target.files[0]);
										// setImageName(e.target.files[0].name);
										// setImage(e.target.files[0]);
									}}
								/>
								{errors.image && (
									<p className="text-danger small">{errors.image.message}</p>
								)}
								<Form.File
									className="text-left"
									id="custom-file-translate-scss"
									label={imageName}
									lang="en"
									custom
									onChange={(e) => {
										setImageName(e.target.files[0].name);
										setImage(e.target.files[0]);
									}}
								/>
								<section className="d-flex flex-row align-items-center justify-content-around mt-4 ">
									<Form.Control
										placeholder="GitHub Profile Url"
										type="text"
										name="github"
										style={{ width: "40%" }}
									/>
									<Form.Control
										style={{ width: "40%" }}
										placeholder="Linkedin Profile Url"
										type="text"
										name="linkedin"
									/>
								</section>
								<div className="d-flex flex-row mt-4 text-center w-75 mx-auto">
									<div className="form-group mx-4 w-50">
										<label htmlFor="course">Availability</label>
										<select
											name="section"
											// value={availability}
											className={"form-control"}
											// onChange={(e) => {
											// 	const result = parseInt(e.target.value);
											// 	setAvailability(result);
											// }}
										>
											<option value={1}>Yes</option>
											<option value={0}>No</option>
										</select>
									</div>

									<div className="form-group mx-4 w-50">
										<label htmlFor="course">Flexibility</label>
										<select
											name="section"
											// value={flexibility}
											className={"form-control"}
											// onChange={(e) => {
											// 	const result = parseInt(e.target.value);
											// 	setFlexibility(result);
											// }}
										>
											<option value={1}>Yes</option>
											<option value={0}>No</option>
										</select>
									</div>
								</div>
								<Form.Group
									className="d-flex flex-row align-items-center mt-4"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label style={{ width: "35%" }} className="mr-4">
										Description
									</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										placeholder="About yourself"
									/>
								</Form.Group>
							</section>
						)}
					</Form>
				</Card.Body>
				{showStepButton()}
				<pre>{JSON.stringify(watch(), null, 2)}</pre>
			</Card>
		</section>
	);
};

export default Register;
