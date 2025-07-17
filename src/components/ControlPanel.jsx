"use client"

import { useState } from "react"
import { startSystem, stopSystem, resetSystem, clearLogs } from "../services/api"
import { FaPlay, FaStop, FaRedo, FaPlane } from "react-icons/fa"

const ControlPanel = () => {
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      await startSystem()
      alert("Flight system started!")
    } catch (error) {
      alert("Error starting system: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStop = async () => {
    setLoading(true)
    try {
      await stopSystem()
      alert("Flight system stopped!")
    } catch (error) {
      alert("Error stopping system: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      await resetSystem()
      await clearLogs()
      alert("Flight system reset and logs cleared!")
    } catch (error) {
      alert("Error resetting system: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const buttons = [
    {
      label: "Start Boarding",
      icon: FaPlay,
      onClick: handleStart,
      gradient: "from-green-600 to-green-700",
      hoverGradient: "hover:from-green-700 hover:to-green-800",
      shadowColor: "shadow-green-200",
    },
    {
      label: "Stop Boarding",
      icon: FaStop,
      onClick: handleStop,
      gradient: "from-red-600 to-red-700",
      hoverGradient: "hover:from-red-700 hover:to-red-800",
      shadowColor: "shadow-red-200",
    },
    {
      label: "Reset System",
      icon: FaRedo,
      onClick: handleReset,
      gradient: "from-orange-600 to-orange-700",
      hoverGradient: "hover:from-orange-700 hover:to-orange-800",
      shadowColor: "shadow-orange-200",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-lg">
          <FaPlane className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Flight Control Panel</h2>
          <p className="text-gray-600">Manage your flight boarding system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`bg-gradient-to-r ${button.gradient} ${button.hoverGradient} text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 focus:ring-4 ${button.shadowColor}`}
            disabled={loading}
          >
            <button.icon className={`text-lg ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Processing..." : button.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ControlPanel
