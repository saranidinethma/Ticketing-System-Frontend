import { useState } from 'react'
import { startSystem, stopSystem, resetSystem, clearLogs } from '../services/api'
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa'

const ControlPanel = () => {
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      await startSystem()
      alert('System started!')
    } catch (error) {
      alert('Error starting system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStop = async () => {
    setLoading(true)
    try {
      await stopSystem()
      alert('System stopped!')
    } catch (error) {
      alert('Error stopping system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      await resetSystem()
      await clearLogs()
      alert('System reset and logs cleared!')
    } catch (error) {
      alert('Error resetting system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const buttons = [
    { 
      label: 'Start System', 
      icon: FaPlay, 
      onClick: handleStart, 
      gradient: 'from-emerald-500 to-teal-500', 
      hoverShadow: 'hover:shadow-emerald-500/50' 
    },
    { 
      label: 'Stop System', 
      icon: FaStop, 
      onClick: handleStop, 
      gradient: 'from-red-500 to-rose-500', 
      hoverShadow: 'hover:shadow-red-500/50' 
    },
    { 
      label: 'Reset System', 
      icon: FaRedo, 
      onClick: handleReset, 
      gradient: 'from-amber-500 to-orange-500', 
      hoverShadow: 'hover:shadow-amber-500/50' 
    }
  ]

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
            <FaPlay className="text-white text-xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Control Panel
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`bg-gradient-to-r ${button.gradient} text-white py-4 px-6 rounded-xl font-semibold shadow-lg ${button.hoverShadow} transition-all duration-300 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden`}
              disabled={loading}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <button.icon className="relative z-10" />
              <span className="relative z-10">
                {loading ? 'Loading...' : button.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ControlPanel