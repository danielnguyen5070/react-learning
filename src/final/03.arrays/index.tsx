import { useState } from 'react'

const fruits = [
	{ id: 'apple', value: '🍎 apple' },
	{ id: 'orange', value: '🍊 orange' },
	{ id: 'grape', value: '🍇 grape' },
	{ id: 'pear', value: '🍐 pear' },
]

function App() {
	const [fruitList, setFruitList] = useState(fruits)
	const [key, setKey] = useState(0)
	return (
		<div className='flex flex-col items-center min-h-screen'>
			<div className='mt-12 max-w-sm' key={key}>
				<button
					onClick={() => { setKey(key + 1); }}
					className="mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
				>
					Reset List
				</button>
				{fruitList.map((fruit) => (
					<div key={fruit.id} className="flex items-center gap-4 mb-4">
						<label className="flex-1">
							{fruit.value}
							<input
								type="text"
								defaultValue={fruit.value}
								className="ml-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</label>
						<button
							onClick={() => setFruitList(fruitList.filter((f) => f.id !== fruit.id))}
							className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
