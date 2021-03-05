import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set } from "js-cookie";

const ImageUpload = ({ alumni }) => {
	const { id } = useParams();
	const [image, setImage] = useState();
	const [imageName, setImageName] = useState("Choose File");
	const [newAlumniImg, setNewAlumniImg] = useState(alumni);
	const [imageError, setImageError] = useState("");
	useEffect(() => {}, [newAlumniImg]);

	return (
		<>
			<div
				className="mx-auto mt-3"
				style={{ width: "8.5rem", height: "8.5rem" }}
			>
				<img
					className="rounded-circle shadow-lg "
					style={{ width: "100%", minHeight: "100%" }}
					src={`http://localhost:8000/storage/images/${newAlumniImg.data.image}`}
				/>
			</div>
			<Form
				className="mt-4 w-75 mx-auto text-center"
				onSubmit={async (e) => {
					e.preventDefault();

					const formData = new FormData();
					formData.append("image", image);
					await axios
						.post(`/alumni/${id}?_method=PUT`, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
						.then((res) => {
							console.log(res);
							setNewAlumniImg(res);
						})
						.catch((e) => {
							setImageError(e.response.data.errors.image[0]);
						});
				}}
			>
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
				{imageError ? (
					<p className="text-danger small m-0 mt-2 mb-2">{imageError}</p>
				) : null}
				<Button type="submit" className="mt-3" size="sm">
					Save
				</Button>
			</Form>
		</>
	);
};

export default ImageUpload;
