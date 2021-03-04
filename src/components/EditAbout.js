import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { useParams } from "react-router-dom";

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
	};

	const updateAlumni = async (
		firstname,
		lastname,
		email,
		availability,
		flexibility,
		description,
		phone
	) => {
		const body = {
			firstname,
			lastname,
			// email,
			availability,
			flexibility,
			description,
			phone,
		};
		await axios.post(`/alumni/${id}?_method=PUT`, body).then((res) => {
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 2000);
		});
	};

	const [availability, setAvailability] = useState(alumniDetails.availability);
	const [flexibility, setFlexibility] = useState(alumniDetails.flexibility);
	const [phone, setPhone] = useState(alumniDetails.phone);
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
				onSubmit={(values, { setSubmitting }) => {
					const { email, firstname, lastname, description } = values;
					setSubmitting(false);
					updateAlumni(
						firstname,
						lastname,
						email,
						availability,
						flexibility,
						description,
						phone
					);
				}}
				validationSchema={Yup.object({
					email: Yup.string()
						.email("Invalid Email Address")
						.required("Email is required"),
					firstname: Yup.string().required("Firstname is required"),
					lastname: Yup.string().required("Lastname is required"),
					// location: Yup.string()
					// 	.max(15, "Must be 15 charaacters or less")
					// 	.required("Location is required"),
					description: Yup.string()
						.max(115, "Must be 115 characters or less")
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
							<PhoneInput
								international
								defaultCountry="LB"
								className="w-100"
								placeholder="Enter phone number"
								value={phone}
								onChange={setPhone}
							/>
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
