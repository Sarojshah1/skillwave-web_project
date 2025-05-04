import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col items-center justify-center text-center p-4">
      <div className="flex gap-10 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="h-20 hover:scale-110 transition-transform duration-300" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="h-20 hover:scale-110 transition-transform duration-300" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-indigo-700 mb-4">Vite + React + Tailwind</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR.
        </p>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  )
}

export default App
