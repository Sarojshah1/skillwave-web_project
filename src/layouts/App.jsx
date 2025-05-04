import { useState } from 'react'
import viteLogo from '/vite.svg'
import { ICONS_PATHS } from '../shared/constants/imagePaths'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col items-center justify-center text-center p-4">
    

      <h1 className="text-4xl font-bold text-indigo-700 mb-4">Vite + React + Tailwind</h1>
      <img src={ICONS_PATHS.logoSecond}/>

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
