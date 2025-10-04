import { HelpCircle, X } from "lucide-react";
import { useState } from 'react'

const ShowHelp = () => {
    const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
                Pathfinding Visualizer
            </h1>
            <button
                onClick={() => setShowHelp(!showHelp)}
                className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                {showHelp ? <X size={24} /> : <HelpCircle size={24} />}
            </button>
        </div>

        {showHelp && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Select a mode below and click on the grid to place items</li>
                    <li>
                        Set one{" "}
                        <span className="font-semibold text-green-600">
                            Start Point
                        </span>{" "}
                        (green)
                    </li>
                    <li>
                        Add one or more{" "}
                        <span className="font-semibold text-red-600">
                            Target Points
                        </span>{" "}
                        (red)
                    </li>
                    <li>
                        Draw <span className="font-semibold text-gray-800">Walls</span>{" "}
                        (black) by clicking and dragging
                    </li>
                    <li>
                        Choose an algorithm and click Run to visualize the pathfinding
                    </li>
                </ol>
            </div>
        )}
    </div>
  )
}

export default ShowHelp;
