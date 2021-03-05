import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Card } from "react-bootstrap";
import axios from "axios";

const Register = () => {
	const [availability, setAvailability] = useState(1);
	const [flexibility, setFlexibility] = useState(1);
	const [phone, setPhone] = useState("");
	const [phoneError, setPhoneError] = useState(false);
	const [birthdate, setBirthdate] = useState(new Date());
	const [birthdateError, setBirthdateError] = useState(false);
	const [pdf, setPdf] = useState();
	const [image, setImage] = useState();
	const [pdfError, setPdfError] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [pdfName, setPdfName] = useState("Choose File");
	const [imageName, setImageName] = useState("Choose File");
	const [github, setGithub] = useState();
	const [githubError, setGithubError] = useState(false);
	const [linkedin, setLinkedin] = useState();
	const [linkedinError, setLinkedinError] = useState(false);
	const [cohorts, setCohorts] = useState([]);
	const [cohort, setCohortValue] = useState();

	const trial = ["Html", "Css", "Javascript"];

	const githubReg = new RegExp(
		/^http(s)?:\/\/([w]{3}\.)?github\.com\/([a-zA-Z0-9-]{5,30})/i
	);

	const linkedinReg = new RegExp(
		/^http(s)?:\/\/([w]{3}\.)?linkedin\.com\/in\/([a-zA-Z0-9-]{5,30})/i
	);

	useEffect(() => {
		axios.get("/cohorts").then((res) => {
			setCohorts(res.data.data);
		});
	}, []);

	return (
		<Card className="text-center w-50 mx-auto shadow border-0 ">
			<Card.Body>
				<Formik
					initialValues={{
						email: "",
						password: "",
						firstname: "",
						lastname: "",
						description: "",
					}}
					onSubmit={async (values, { setSubmitting }) => {
						const {
							email,
							firstname,
							lastname,
							description,
							password,
						} = values;
						setSubmitting(false);
						if (!isValidPhoneNumber(phone)) {
							setPhoneError(true);
							return;
						}
						if (github) {
							console.log(githubReg.test(github));
							if (githubReg.test(github)) {
								setGithubError(true);
							}
						}
						if (linkedin) {
							console.log(linkedinReg.test(linkedin));
							if (linkedinReg.test(linkedin)) {
								setLinkedinError(true);
							}
						}
						const formData = new FormData();
						formData.append("pdf", pdf);
						formData.append("image", image);
						formData.append("cohort", cohort);
						formData.append("firstname", firstname);
						formData.append("lastname", lastname);
						formData.append("password", password);
						formData.append("description", description);
						formData.append("availability", availability);
						formData.append("flexibility", flexibility);
						formData.append("email", email);
						formData.append("phone", phone);
						formData.append("github", github);
						formData.append("linkedin", linkedin);
						formData.append("birthdate", birthdate.toISOString().slice(0, 10));
						formData.append("status", 0);

						trial.forEach((skill) => {
							formData.append("skills[]", skill);
						});
						console.log(formData.getAll("skills"));

						axios
							.post("/alumni/register", formData, {
								headers: {
									"Content-Type": "multipart/form-data",
								},
							})
							.then((res) => console.log(res));
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid Email Address")
							.required("Email is required"),
						firstname: Yup.string().required("Firstname is required"),
						lastname: Yup.string().required("Lastname is required"),
						password: Yup.string().required("password is required"),
						description: Yup.string()
							.max(215, "Must be 215 characters or less")
							.required("Description is required")
							.min(50, "Must be 50 characters or more"),
					})}
				>
					{(formik, isSubmitting) => (
						<Form className="mt-5">
							<section className="d-flex flex-row align-items-center justify-content-around">
								<div
									className="form-group  text-center"
									style={{ width: "40%" }}
								>
									<label htmlFor="firstname" className="w-25">
										Firstname
									</label>
									<div className="w-100">
										<Field
											name="firstname"
											className={
												formik.touched.firstname && formik.errors.firstname
													? "form-control is-invalid "
													: "form-control "
											}
											type="text"
										/>
										{formik.touched.firstname && formik.errors.firstname ? (
											<div className="invalid-feedback">
												{formik.errors.firstname}
											</div>
										) : null}
									</div>
								</div>
								<div
									style={{ width: "40%" }}
									className="form-group  text-center "
								>
									<label htmlFor="lastname" className="w-25">
										Lastname
									</label>
									<div className="w-100">
										<Field
											name="lastname"
											className={
												formik.touched.lastname && formik.errors.lastname
													? "form-control is-invalid "
													: "form-control "
											}
											type="text"
										/>
										{formik.touched.lastname && formik.errors.lastname ? (
											<div className="invalid-feedback">
												{formik.errors.lastname}
											</div>
										) : null}
									</div>
								</div>
							</section>

							<div className="form-group d-flex flex-row align-items-center text-center mt-4 justify-content-around">
								<div style={{ width: "40%" }}>
									<label htmlFor="username" className="w-25">
										Email
									</label>
									<div className="w-100">
										<Field
											name="email"
											className={
												formik.touched.email && formik.errors.email
													? "form-control is-invalid "
													: "form-control "
											}
											type="email"
										/>
										{formik.touched.email && formik.errors.email ? (
											<div className="invalid-feedback">
												{formik.errors.email}
											</div>
										) : null}
									</div>
								</div>

								<div className="text-center " style={{ width: "40%" }}>
									<label className="w-25">Phone</label>
									<div className="w-100">
										<PhoneInput
											international
											defaultCountry="LB"
											className="w-100"
											placeholder="Enter phone number"
											value={phone}
											onChange={setPhone}
										/>
										{phoneError && (
											<p className="text-danger small mt-2">
												Please Enter a valid Phone number
											</p>
										)}
									</div>
								</div>
							</div>

							<div
								className="form-group mx-auto  text-center"
								style={{ width: "40%" }}
							>
								<label htmlFor="password" className="w-25">
									password
								</label>
								<div className="w-100">
									<Field
										name="password"
										className={
											formik.touched.password && formik.errors.password
												? "form-control is-invalid "
												: "form-control "
										}
										type="password"
									/>
									{formik.touched.password && formik.errors.password ? (
										<div className="invalid-feedback">
											{formik.errors.password}
										</div>
									) : null}
								</div>
							</div>

							<div className="d-flex flex-row align-items-center mt-5">
								<div
									style={{
										width: "37.5%",
										borderBottom: "1px solid rgba(0,0,0,0.3)",
										display: "inline-block",
									}}
								></div>
								<span className="mx-2 small text-secondary text-center">
									General Information
								</span>

								<div
									style={{
										width: "37.5%",
										borderBottom: "1px solid rgba(0,0,0,0.3)",
										display: "inline-block",
									}}
								></div>
							</div>
							<div className="form-group text-center mt-5">
								<label htmlFor="description" className="w-25 text-center">
									Description
								</label>
								<div className="w-50 mx-auto">
									<Field
										maxLength={115}
										rows={4}
										name="description"
										className={
											formik.touched.description && formik.errors.description
												? "form-control is-invalid "
												: "form-control"
										}
										as="textarea"
									/>
									{formik.touched.description && formik.errors.description ? (
										<div className="invalid-feedback">
											{formik.errors.description}
										</div>
									) : null}
								</div>
							</div>
							<div className=" mt-5 d-flex flex-row align-items-center justify-content-around">
								<div style={{ width: "40%" }}>
									<p className=" text-center m-0">Porfile Image</p>
									<div className="mt-2">
										<div className="custom-file text-left">
											<input
												type="file"
												className="custom-file-input"
												id="customFile"
												onChange={(e) => {
													setImage(e.target.files[0]);
													setImageName(e.target.files[0].name);
												}}
											/>
											<label className="custom-file-label" htmlFor="customFile">
												{imageName}
											</label>
										</div>
										{pdfError && (
											<p className="text-danger small mt-2">
												The Cv must be a file of type: Pdf
											</p>
										)}
									</div>
								</div>
								<div style={{ width: "40%" }}>
									<p className="text-center m-0">Cv</p>
									<div className="mt-2">
										<div className="custom-file text-left">
											<input
												type="file"
												className="custom-file-input"
												id="customFile"
												onChange={(e) => {
													setPdf(e.target.files[0]);
													setPdfName(e.target.files[0].name);
												}}
											/>
											<label className="custom-file-label" htmlFor="customFile">
												{pdfName}
											</label>
										</div>
										{pdfError && (
											<p className="text-danger small mt-2">
												The Cv must be a file of type: Pdf
											</p>
										)}
									</div>
								</div>
							</div>

							<div className="d-flex flex-row mt-5 text-center w-75 mx-auto">
								<div className="form-group mx-4 w-50">
									<label htmlFor="course">Availability</label>
									<select
										name="section"
										value={availability}
										className={"form-control"}
										onChange={(e) => {
											if (e.target.value == 1) {
												setAvailability(1);
											} else {
												setAvailability(0);
											}
										}}
									>
										<option value={1}>Yes</option>
										<option value={0}>No</option>
									</select>
								</div>

								<div className="form-group mx-4 w-50">
									<label htmlFor="course">Flexibility</label>
									<select
										name="section"
										className={"form-control"}
										onChange={(e) => {
											if (e.target.value == 1) {
												setFlexibility(1);
											} else {
												setFlexibility(0);
											}
										}}
									>
										<option value={1}>Yes</option>
										<option value={0}>No</option>
									</select>
								</div>
							</div>
							<section className="d-flex flex-row align-items-center justify-content-around">
								<div className=" mt-4">
									<p className="m-0 ">Birthdate:</p>
									<div>
										<DatePicker
											// style={{ width: "85%" }}
											minDate={new Date(1900, 1, 1)}
											maxDate={new Date()}
											className=" form-control"
											dateFormat="yyyy/MM/dd"
											selected={birthdate}
											onChange={(date) => {
												setBirthdate(date);
											}}
										/>

										{birthdateError && (
											<p className="text-danger small mt-2">
												Please set a valid Date
											</p>
										)}
									</div>
									<div className="mt-4">
										<label htmlFor="course">Cohorts</label>
										<select
											name="cohorts"
											className={"form-control"}
											onChange={(e) => {
												setCohortValue(e.target.value);
											}}
										>
											{cohorts.map((cohort) => {
												return (
													<option key={cohort.id} value={cohort.cohort}>
														{cohort.cohort}
													</option>
												);
											})}
										</select>
									</div>
								</div>
							</section>

							<section className="d-flex flex-row align-items-center justify-content-around mt-5">
								<div
									className="form-group  text-center"
									style={{ width: "40%" }}
								>
									<label htmlFor="github" className="w-25">
										github
									</label>
									<div className="w-100">
										<input
											name="github"
											className="form-control"
											type="text"
											// value={github}
											onChange={(e) => {
												setGithub(e.target.value);
											}}
										/>
										{githubError && (
											<p className="text-danger small text-center">
												Please insert correct URL
											</p>
										)}
									</div>
								</div>
								<div
									style={{ width: "40%" }}
									className="form-group  text-center "
								>
									<label htmlFor="linkedin" className="w-25">
										linkedin
									</label>
									<div className="w-100">
										<input
											name="linkedin"
											// value={linkedin}
											className="form-control"
											onChange={(e) => {
												setLinkedin(e.target.value);
											}}
											type="text"
										/>
										{linkedinError && (
											<p className="text-danger small text-center">
												Please insert correct URL
											</p>
										)}
									</div>
								</div>
							</section>
							<div className="form-group">
								<button
									style={{ background: "#ffbf0e", border: "none" }}
									type="submit"
									className="btn btn-primary shadow-sm mt-5 ml-4 onSave"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Please wait..." : "Save"}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Card.Body>
		</Card>
	);
};

export default Register;
