import React from "react";
import F4F from "../undraw_page_not_found_su7k.svg";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const FourOFour = () => {
	const history = useHistory();
	return (
		<main
			className="d-flex flex-row align-items-center justify-content-around"
			style={{ padding: "0 10% 0 10%", height: "100vh" }}
		>
			<img src={F4F} className="w-50" />
			<div className="ml-5">
				<h1>
					<span style={{ color: "#ffbf0e" }}>Oops,</span>
					<br /> Nothing here
				</h1>
				<p className="text-secondary mt-4">
					Uh Oh, we can't seem to find the page you're looking for,
					<br />
					try going back to the previous page or contact us for more information
				</p>

				<Button
					className="mt-4"
					onClick={() => {
						history.goBack();
					}}
				>
					Go Back
				</Button>
			</div>
		</main>
	);
};

export default FourOFour;
