import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { date } from "yup/lib/locale";

const EditAbout = ({ alumni }) => {
	const { id } = useParams();
	const alumniDetails = {
		firstname: alumni.data.firstname,
		lastname: alumni.data.lastname,
		email: alumni.data.email,
		description: alumni.data.description,
		availability: alumni.data.availability,
		flexibility: alumni.data.flexibility,
		phone: alumni.data.phone,
		birthdate: alumni.data.birthdate,
		city: alumni.data.city,
	};
	const birthdateRegex = new RegExp(
		/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
	);
	const updateAlumni = async (
		firstname,
		lastname,
		email,
		availability,
		flexibility,
		description,
		phone,
		birthdate,
		pdf
	) => {
		if (!birthdateRegex.test(birthdate.toISOString().slice(0, 10))) {
			setBirthdateError(true);
			return;
		}
		if (!isValidPhoneNumber(phone)) {
			setPhoneError(true);
			return;
		}

		const body = {
			firstname,
			lastname,
			availability,
			flexibility,
			description,
			phone,
			birthdate: birthdate.toISOString().slice(0, 10),
		};
		await axios.post(`/alumni/${id}?_method=PUT`, body).then((res) => {
			console.log(res);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 2000);
		});
	};

	const [availability, setAvailability] = useState(alumniDetails.availability);
	const [flexibility, setFlexibility] = useState(alumniDetails.flexibility);
	const [phone, setPhone] = useState(alumniDetails.phone);
	const [phoneError, setPhoneError] = useState(false);
	const [birthdate, setBirthdate] = useState(new Date(alumniDetails.birthdate));
	const [birthdateError, setBirthdateError] = useState(false);
	const [pdf, setPdf] = useState();
	const [pdfError, setPdfError] = useState(false);
	const [pdfName, setPdfName] = useState("Choose File");
	const [success, setSuccess] = useState(false);

	return (
		<>
			{success ? <h2>success</h2> : null}
			<div className="d-flex flex-row align-items-center mt-4">
				<div
					style={{
						width: "37.5%",
						borderBottom: "1px solid rgba(0,0,0,0.3)",
						display: "inline-block",
					}}
				></div>
				<span className="mx-2 small text-secondary text-center">
					Contact Information
				</span>

				<div
					style={{
						width: "37.5%",
						borderBottom: "1px solid rgba(0,0,0,0.3)",
						display: "inline-block",
					}}
				></div>
			</div>
			<Formik
				initialValues={{
					email: alumniDetails.email,
					firstname: alumniDetails.firstname,
					lastname: alumniDetails.lastname,
					description: alumniDetails.description,
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const { email, firstname, lastname, description } = values;
					setSubmitting(false);
					if (pdf) {
						const formData = new FormData();
						formData.append("pdf", pdf);
						await axios
							.post(`/alumni/${id}?_method=PUT`, formData, {
								headers: {
									"Content-Type": "multipart/form-data",
								},
							})
							.then((res) => {
								console.log(res);
							})
							.catch((e) => {
								if (
									e.response.data.errors.pdf[0] ==
									"The pdf must be a file of type: application/pdf."
								) {
									setPdfError(true);
								}
								console.log(e.response.data.errors.pdf[0]);
							});
					}

					updateAlumni(
						firstname,
						lastname,
						email,
						availability,
						flexibility,
						description,
						phone,
						birthdate,
						pdf
					);
				}}
				validationSchema={Yup.object({
					email: Yup.string()
						.email("Invalid Email Address")
						.required("Email is required"),
					firstname: Yup.string().required("Firstname is required"),
					lastname: Yup.string().required("Lastname is required"),
					description: Yup.string()
						.max(215, "Must be 215 characters or less")
						.required("Description is required")
						.min(50, "Must be 50 characters or more"),
				})}
			>
				{(formik, isSubmitting) => (
					<Form className="mt-5">
						<div className="form-group d-flex flex-row align-items-center text-center">
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
						<div className="form-group d-flex flex-row align-items-center text-center mt-4">
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

						<div className="form-group d-flex flex-row align-items-center text-center mt-4">
							<label htmlFor="username" className="w-25">
								Email
							</label>
							<div className="w-100">
								<Field
									disabled={true}
									name="email"
									className={
										formik.touched.email && formik.errors.email
											? "form-control is-invalid "
											: "form-control "
									}
									type="email"
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="invalid-feedback">{formik.errors.email}</div>
								) : null}
							</div>
						</div>
						<div className="d-flex flex-row text-center mt-5 align-items-center">
							<p className="w-25 mx-auto m-0">Phone</p>
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
						<div className="form-group d-flex flex-row mt-5">
							<label htmlFor="description" className="w-25 text-center">
								Description
							</label>
							<div className="w-100">
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
						<div className="d-flex flex-row align-items-center mt-4">
							<p className="w-25 text-center m-0">Cv</p>
							<div>
								<div className="custom-file w-100">
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

						<div className="d-flex flex-row mt-5 text-center w-75 mx-auto">
							<div className="form-group mx-4 w-50">
								<label htmlFor="course">Availability</label>
								<select
									name="section"
									value={availability}
									className={"form-control"}
									onChange={(e) => {
										const result = parseInt(e.target.value);
										setAvailability(result);
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
									value={flexibility}
									className={"form-control"}
									onChange={(e) => {
										const result = parseInt(e.target.value);
										setFlexibility(result);
									}}
								>
									<option value={1}>Yes</option>
									<option value={0}>No</option>
								</select>
							</div>
						</div>
						<div className="d-flex flex-row justify-content-around align-items-center mt-4">
							<p className="m-0 ">Birthdate:</p>
							<div className="w-75">
								<DatePicker
									// style={{ width: "85%" }}
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
						</div>

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
		</>
	);
};

export default EditAbout;
