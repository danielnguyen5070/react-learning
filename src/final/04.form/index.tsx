import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	name: z.string().min(3, "At least 3 characters"),
	email: z.email("Invalid email"),
	age: z.number().min(6, "At least 6 years old").max(120, "Maximum age is 120")
});

type FormValues = z.infer<typeof schema>;

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormValues>({
		resolver: zodResolver(schema)
	});

	const onSubmit = async (data: FormValues) => {
		console.log("Form submitted:", data);
		// simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		alert("Form submitted successfully!");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4">
			<div>
				<label className="block mb-2">Name</label>
				<input
					{...register("name")}
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your name"
				/>
				{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
			</div>

			<div>
				<label className="block mb-2">Email</label>
				<input
					{...register("email")}
					type="email"
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your email"
				/>
				{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
			</div>

			<div>
				<label className="block mb-2">Age</label>
				<input
					{...register("age")}
					type="number"
					className="border p-2 w-full rounded border-gray-400"
					placeholder="Enter your age"
				/>
				{errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded w-full"
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
}

export default App
