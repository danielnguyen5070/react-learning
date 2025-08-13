import React, { useState, useEffect, useMemo } from "react";
import { throttle } from "./utils";

const BackToTop: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	function handleScroll() {
		console.log("Scroll event triggered");
		setIsVisible(window.scrollY > 300);
	}
	const checkScroll = useMemo(() => throttle(handleScroll, 100), []);

	useEffect(() => {
		window.addEventListener("scroll", checkScroll);
		return () => window.removeEventListener("scroll", checkScroll);
	}, [checkScroll]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="relative">
			<div style={{ height: "2500px", padding: "20px" }}>
				<p>Scroll down to see the "Back to Top" button appear.</p>
			</div>
			{isVisible && (
				<button
					onClick={scrollToTop}
					style={{
						position: "fixed",
						bottom: "20px",
						right: "20px",
						padding: "10px 15px",
						fontSize: "16px",
						cursor: "pointer",
						borderRadius: "8px",
						backgroundColor: "#333",
						color: "#fff",
						border: "none",
					}}
					className="bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 transition-colors duration-300"
				>
					↑ Back to Top
				</button>
			)}
		</div>
	);
};

export default BackToTop;
