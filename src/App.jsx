import React from "react"
import Canvas from "./components/canvas"
import Toolbar from "./components/toolbar"

function App() {
  return (
    <div className="flex flex-col h-screen relative">
      {/* Top toolbar */}
      <div className="h-12 flex items-center px-4 justify-center absolute top-5 left-0 right-0 z-50">
        <Toolbar />
      </div>

      {/* Canvas area */}
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  )
}

export default App
