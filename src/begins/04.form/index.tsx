function App() {

	return (
		<form className="max-w-sm mx-auto space-y-4">
			<div>
				<label className="block mb-2">Name</label>
				<input
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your name"
				/>
			</div>

			<div>
				<label className="block mb-2">Email</label>
				<input
					type="email"
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your email"
				/>
			</div>

			<div>
				<label className="block mb-2">Age</label>
				<input
					type="number"
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your age"
				/>
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded w-full"
			>
				{"Submit"}
			</button>
		</form>
	);
}

export default App
