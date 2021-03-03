import React, { useContext, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cookie from "js-cookie";
import UserContext from "./UserContext";
function LoginModal(props) {
	const { token, setToken } = useContext(UserContext);

	const loginSubmit = async (email, password) => {
		const body = { email: email, password: password };
		const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
		try {
			await axios
				.post("http://localhost:8000/api/alumni/login", body)
				.then((res) => {
					cookie.set("token", res.data.access_token, {
						expires: inOneHour,
					});
					setToken(res.data.access_token);
				})
				.then(props.onHide);
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter ">Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={(values, { setSubmitting }) => {
						const { email, password } = values;
						setSubmitting(false);
						loginSubmit(email, password);
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid Email Address")
							.required("Email is required"),
						password: Yup.string()
							.min(3, "Must be 3 characters or more")
							.max(15, "Must be 15 characters or less")
							.required("Password is required"),
					})}
				>
					{(formik, isSubmitting) => (
						<Form>
							<div className="form-group">
								<label htmlFor="username">email</label>
								<Field
									name="email"
									className={
										formik.touched.email && formik.errors.email
											? "form-control is-invalid"
											: "form-control"
									}
									type="email"
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="invalid-feedback">{formik.errors.email}</div>
								) : null}
							</div>

							<div className="form-group">
								<label htmlFor="password">password</label>
								<Field
									name="password"
									className={
										formik.touched.password && formik.errors.password
											? "form-control is-invalid"
											: "form-control"
									}
									type="password"
								/>
								{formik.touched.password && formik.errors.password ? (
									<div className="invalid-feedback">
										{formik.errors.password}
									</div>
								) : null}
							</div>

							<div className="form-group">
								<button
									style={{
										background: "#dc3545",
										borderColor: "#dc3545",
									}}
									type="submit"
									className="btn btn-primary mt-4"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Please wait..." : "Submit"}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}

export default LoginModal;
